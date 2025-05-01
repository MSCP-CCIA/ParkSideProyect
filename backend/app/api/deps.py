# app/api/deps.py

from collections.abc import Generator
from datetime import date
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from sqlmodel import Session

from app.core import security
from app.core.config import settings
from app.core.db import engine
from app.models.card import CreateCardRequest1, CreateCardRequest2, UpdateCardRequest
from app.models.customer import CreateCustomerRequest1, CreateCustomerRequest2, Customer as User
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
    tokenUrl=f"{settings.API_V1_STR}/login/access-token"
)
TokenDep = Annotated[str, Depends(reusable_oauth2)]


def get_current_user(session: SessionDep, token: TokenDep) -> User:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[security.ALGORITHM])
        token_data = TokenPayload(**payload)
    except (InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = session.get(User, token_data.sub)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")
    return user

CurrentUser = Annotated[User, Depends(get_current_user)]


def get_current_active_superuser(current_user: CurrentUser) -> User:
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

# -------------------------------------------------------------------
# 4) Transformadores / helpers existentes
# -------------------------------------------------------------------
def transform_card_create_model(json: CreateCardRequest1) -> CreateCardRequest2:
    return CreateCardRequest2(
        card_number_hash=security.hash_card_number(str(json.card_number)),
        full_name_customer=json.full_name_customer,
        cvc_code_hash=security.hash_card_number(str(json.cvc)),
        expiration_date=date(json.year, json.month, 1),
        card_type=json.card_type,
        customer_id=json.customer_id
    )

def transform_card_update_model(json: UpdateCardRequest) -> CreateCardRequest2:
    return CreateCardRequest2(
        card_number_hash=json.card_number_hash,
        full_name_customer=json.full_name_customer,
        cvc_code_hash=security.hash_card_number(str(json.cvc)),
        expiration_date=date(json.year, json.month, 1),
        card_type=json.card_type,
        customer_id=json.customer_id
    )

def hash_password_dep(json: CreateCustomerRequest1) -> CreateCustomerRequest2:
    return CreateCustomerRequest2(
        id=json.id,
        full_name=json.full_name,
        email=json.email,
        password_hash=security.hash_password(json.password),
        is_active=json.is_active,
        parking_id=json.parking_id
    )
