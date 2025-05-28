# app/api/deps.py

from collections.abc import Generator
from datetime import date
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from sqlmodel import Session, select, desc

from app.core import security
from app.core.config import settings
from app.core.db import engine
from app.models.paymentGateway import PaymentGateway
from app.models.card import CreateCardRequest, UpdateCardRequest, Card
from app.models.customer import CreateCustomerRequest, Customer
from app.models.parkingRegistration import ParkingRegistration
from app.models.payment import Payment
from app.models.employee import Employee
from app.schemas.token import TokenPayload

# --- Nuestras tablas ---
from app.models.employee import Employee as EmployeeModel


# -------------------------------------------------------------------
# 1) Dependencia genérica de DB
# -------------------------------------------------------------------
def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db)]

# -------------------------------------------------------------------
# 2) OAuth2 para Clientes (Customer)
# -------------------------------------------------------------------
reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/customer/login"
)
TokenDep = Annotated[str, Depends(reusable_oauth2)]


def get_current_customer(session: SessionDep, token: TokenDep) -> Customer:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[security.ALGORITHM])
        token_data = TokenPayload(**payload)
    except (InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    customer = session.get(Customer, token_data.sub)
    if not customer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if not customer.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive customer")
    return customer


CurrentCustomer = Annotated[Customer, Depends(get_current_customer)]


def get_current_active_superuser(current_user: CurrentCustomer) -> Customer:
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The user doesn't have enough privileges"
        )
    return current_user


# -------------------------------------------------------------------
# 3) OAuth2 y dependencias para Employee (Admin)
# -------------------------------------------------------------------
reusable_oauth2_employee = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/employee/login"
)
EmployeeTokenDep = Annotated[str, Depends(reusable_oauth2_employee)]


def get_current_employee(
        session: SessionDep,
        token: EmployeeTokenDep
) -> EmployeeModel:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[security.ALGORITHM])
        sub = payload.get("sub")
        if sub is None:
            raise credentials_exception
        emp_id = int(sub)
    except (InvalidTokenError, ValidationError, ValueError):
        raise credentials_exception

    emp = session.get(EmployeeModel, emp_id)
    if not emp:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
    if not emp.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive employee")
    return emp


CurrentEmployee = Annotated[EmployeeModel, Depends(get_current_employee)]


def get_current_active_employee_superuser(
        current_employee: CurrentEmployee,
) -> EmployeeModel:
    # Ajusta esta validación según cómo señales privilegios en Employee
    if current_employee.job_position.lower() not in ["administrador", "admin", "superuser"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient privileges"
        )
    return current_employee


SuperuserEmployee = Annotated[EmployeeModel, Depends(get_current_active_employee_superuser)]


def get_parking_employee(session: Session, employee_id: int) -> int:
    employee = session.exec(select(Employee).where(Employee.id == employee_id)).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Empleado no encontrado"
        )
    return employee.parking_id


# -------------------------------------------------------------------
# 4) Transformadores / helpers existentes
# -------------------------------------------------------------------

def transform_paymentwateway_create_model(request: CreateCardRequest) -> dict:
    return {
        "token": security.generate_token_paymentgateway(),
        "pan": request.card_number,
        "cvc": request.cvc,
        "exp_month": request.month,
        "exp_year": request.year,
        "card_owner_name": request.full_name_customer
    }

def transform_paymentwateway_update_model(request: UpdateCardRequest, paymentGateway: PaymentGateway) -> dict:
    return {
        "token": paymentGateway.token,
        "pan": paymentGateway.pan,
        "cvc": request.cvc,
        "exp_month": request.month,
        "exp_year": request.year,
        "card_owner_name": request.full_name_customer
    }


def generate_card_id(last_four_number: int, customer_id: int) -> int:
    # Generar id de Card a partir de customer_id + últimos 4 dígitos
    last_four_str = str(last_four_number)
    return int(f"{customer_id}{last_four_str}")


def transform_card_create_model(request: CreateCardRequest, token: str) -> dict:
    last_four_number = request.card_number % 10000
    card_id = generate_card_id(last_four_number=last_four_number, customer_id=request.customer_id)
    return {
        "id": card_id,
        "card_type": request.card_type,
        "last_four_digits": last_four_number,
        "customer_id": request.customer_id,
        "token": token,
    }


def transform_customer_create_model(request: CreateCustomerRequest) -> dict:
    return {
        "id": request.id,
        "full_name": request.full_name,
        "email": request.email,
        "document_type": request.document_type,
        "password_hash": security.hash_password(request.password),
        "is_active": request.is_active,
        "parking_id": request.parking_id
    }
