from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.core.security import hash_password
from app.api.deps import hash_password_dep
from app.models.customer import *


def create_user(*, session: Session, json: CreateCustomerRequest1) -> Customer:
    try:
        json = hash_password_dep(json)
        print(json)
        db_obj = Customer.model_validate(
            json
        )
        session.add(db_obj)
        session.commit()
        session.refresh(db_obj)
        return db_obj
    except HTTPException as e:
        print("xd")
        raise
    except Exception as e:
        print("xd2")
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


def authenticate(*, session: Session, json: SearchCustomerRequest) -> Customer | None:
    customer = get_customer_by_email(session=session, email=json.email)
    if not customer:
        return None
    if not hash_password(json.password) != customer.password_hash:
        return None
    return customer
