from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.core.security import hash_password
from app.api.deps import transform_customer_hash_password
from app.models.customer import *
from app.api.deps import get_parking_employee

# ------------------------- Customer Actions ------------------------- #

def create_user(*, session: Session, json: CreateCustomerRequest) -> Customer:
    try:
        json = transform_customer_hash_password(json)
        db_obj = Customer.model_validate(
            json
        )
        session.add(db_obj)
        session.commit()
        session.refresh(db_obj)
        return db_obj
    except HTTPException as e:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al crear el usuario: {str(e)}"
        )


def update_user(*, session: Session, json: UpdateCustomerRequest) -> Customer:
    try:
        statement = select(Customer).where(Customer.id == json.id)
        customer = session.exec(statement).first()
        if not customer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuario no encontrado"
            )
        update_data = json.model_dump(exclude_unset=True, exclude={"id"})
        for field, value in update_data.items():
            setattr(customer, field, value)
        session.add(customer)
        session.commit()
        session.refresh(customer)
        return customer
    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al actualizar el usuario: {str(e)}"
        )


def get_customer_by_id(*, session: Session, json: SearchMyInformationRequest) -> Customer:
    statement = select(Customer).where(Customer.id == json.id)
    session_customer = session.exec(statement).first()
    return session_customer


def get_customer_by_email(*, session: Session, email: str) -> Customer | None:
    statement = select(Customer).where(Customer.email == email)
    session_customer = session.exec(statement).first()
    return session_customer


def authenticate_customer(*, session: Session, json: SearchCustomerRequest) -> Customer | None:
    customer = get_customer_by_email(session=session, email=json.email)
    if not customer:
        return None
    if not hash_password(json.password) != customer.password_hash:
        return None
    return customer

# ------------------------- Employee Actions ------------------------- #

def get_customer_by_id_crud(*, session: Session, json: SearchCustomerByIdRequest) -> Customer:
    try:
        parking_id = get_parking_employee(session=session, employee_id=json.employee_id)
        statement = select(Customer).where((Customer.id == json.customer_id) & (Customer.parking_id == parking_id))
        customers = session.exec(statement).first()
        if not customers:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontraron usuarios"
            )
        return customers
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener los usuarios: {str(e)}"
        )


def update_customer_state_crud(*, session: Session, json: UpdateCustomerStateRequest) -> Customer:
    try:
        parking_id = get_parking_employee(session=session, employee_id=json.employee_id)
        statement = select(Customer).where((Customer.id == json.customer_id) & (Customer.parking_id == parking_id))
        customer = session.exec(statement).first()
        if not customer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuario no encontrado"
            )
        setattr(customer, 'is_active', False if customer.is_active else True)
        session.add(customer)
        session.commit()
        session.refresh(customer)
        return customer
    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al actualizar el usuario: {str(e)}"
        )
