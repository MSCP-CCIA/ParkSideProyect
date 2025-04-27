import uuid
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select

from app import crud
from app.api.deps import (
    CurrentUser,
    SessionDep,
    get_current_active_superuser,
)
from app.core.config import settings
from app.core.security import get_password_hash, verify_password
from app.utils import generate_new_account_email, send_email
from app.models.customer import Customer
from app.schemas.customer import CustomerCreate, CustomerUpdate, CustomerPublic, CustomerRegister
from app.schemas.common import Message

router = APIRouter(prefix="/customers", tags=["customers"])


@router.get("/", response_model=list[CustomerPublic])
def read_customers(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve customers.
    """
    statement = select(Customer).offset(skip).limit(limit)
    customers = session.exec(statement).all()
    return customers


@router.post(
    "/", dependencies=[Depends(get_current_active_superuser)], response_model=CustomerPublic
)
def create_customer(*, session: SessionDep, customer_in: CustomerCreate) -> Any:
    """
    Create new customer (admin only).
    """
    customer = crud.get_user_by_email(session=session, email=customer_in.email)
    if customer:
        raise HTTPException(
            status_code=400,
            detail="A customer with this email already exists.",
        )

    customer = crud.create_user(session=session, user_create=customer_in)
    if settings.emails_enabled and customer_in.email:
        email_data = generate_new_account_email(
            email_to=customer_in.email, username=customer_in.email, password=customer_in.password
        )
        send_email(
            email_to=customer_in.email,
            subject=email_data.subject,
            html_content=email_data.html_content,
        )
    return customer


@router.post("/signup", response_model=CustomerPublic)
def register_customer(session: SessionDep, customer_in: CustomerRegister) -> Any:
    """
    Register a new customer (no login required).
    """
    customer = crud.get_user_by_email(session=session, email=customer_in.email)
    if customer:
        raise HTTPException(
            status_code=400,
            detail="A customer with this email already exists.",
        )
    customer_create = CustomerCreate.model_validate(customer_in)
    customer = crud.create_user(session=session, user_create=customer_create)
    return customer


@router.get("/me", response_model=CustomerPublic)
def read_customer_me(current_user: CurrentUser) -> Any:
    """
    Get current customer.
    """
    return current_user


@router.patch("/me", response_model=CustomerPublic)
def update_customer_me(
    *, session: SessionDep, customer_in: CustomerUpdate, current_user: CurrentUser
) -> Any:
    """
    Update own customer data.
    """
    if customer_in.email:
        existing_customer = crud.get_user_by_email(session=session, email=customer_in.email)
        if existing_customer and existing_customer.id != current_user.id:
            raise HTTPException(
                status_code=409, detail="Email already in use."
            )
    customer_data = customer_in.model_dump(exclude_unset=True)
    current_user.sqlmodel_update(customer_data)
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return current_user


@router.patch("/me/password", response_model=Message)
def update_customer_password_me(
    *, session: SessionDep, body: dict, current_user: CurrentUser
) -> Any:
    """
    Update own customer password.
    """
    if not verify_password(body["current_password"], current_user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect current password")
    if body["current_password"] == body["new_password"]:
        raise HTTPException(status_code=400, detail="New password must be different")
    current_user.password_hash = get_password_hash(body["new_password"])
    session.add(current_user)
    session.commit()
    return Message(message="Password updated successfully")


@router.get("/{customer_id}", response_model=CustomerPublic)
def read_customer_by_id(
    customer_id: uuid.UUID, session: SessionDep, current_user: CurrentUser
) -> Any:
    """
    Get a specific customer by id.
    """
    customer = session.get(Customer, customer_id)
    if customer == current_user:
        return customer
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=403,
            detail="Insufficient privileges.",
        )
    return customer


@router.patch(
    "/{customer_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CustomerPublic,
)
def update_customer(
    *, session: SessionDep, customer_id: uuid.UUID, customer_in: CustomerUpdate
) -> Any:
    """
    Update a customer (admin only).
    """
    db_customer = session.get(Customer, customer_id)
    if not db_customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found.",
        )
    if customer_in.email:
        existing_customer = crud.get_user_by_email(session=session, email=customer_in.email)
        if existing_customer and existing_customer.id != customer_id:
            raise HTTPException(
                status_code=409, detail="Email already in use."
            )
    db_customer = crud.update_user(session=session, db_user=db_customer, user_in=customer_in)
    return db_customer


@router.delete("/{customer_id}", dependencies=[Depends(get_current_active_superuser)])
def delete_customer(
    session: SessionDep, customer_id: uuid.UUID, current_user: CurrentUser
) -> Message:
    """
    Delete a customer (admin only).
    """
    customer = session.get(Customer, customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    if customer == current_user:
        raise HTTPException(
            status_code=403, detail="Super users cannot delete themselves"
        )
    session.delete(customer)
    session.commit()
    return Message(message="Customer deleted successfully")
