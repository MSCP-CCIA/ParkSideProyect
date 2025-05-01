from datetime import timedelta
from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.security import OAuth2PasswordRequestForm

from app import crud
from app.api.deps import CurrentUser, SessionDep, get_current_active_superuser
from app.core import security
from app.core.config import settings
from app.core.security import get_hash
from app.schemas.login import Message, NewPassword, Token
from app.schemas.customer import CustomerPublic
from app.utils import (
    generate_password_reset_token,
    generate_reset_password_email,
    send_email,
    verify_password_reset_token,
)
from app.models.customer import *
from app.crud.customerCrud import *
from app.core.security import create_access_token

router = APIRouter(tags=["login"])


@router.post("/register/", response_model=Message)
def register(session: SessionDep, json: CreateCustomerRequest1) -> Message:
    try:
        create_user(session=session, json=json)
        return Message(message="Registro de usuario exitoso")
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al registrar el usuario"
        )


@router.post("/login/", response_model=SearchCustomerResponse)
def login(session: SessionDep, json: SearchCustomerRequest) -> SearchCustomerResponse:
    customer = authenticate(session=session, json=json)
    if not customer:
        raise HTTPException(
            status_code=400,
            detail="Incorrect email or password"
        )
    elif not customer.is_active:
        raise HTTPException(
            status_code=400,
            detail="Inactive user"
        )
    access_token = create_access_token(subject=customer.id, expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    return SearchCustomerResponse(
        id=customer.id,
        token=access_token
    )


@router.post("/update-customer/", response_model=Message)
def update_card(session: SessionDep, json: UpdateCustomerRequest) -> Message:
    try:
        update_user(session=session, json=json)
        return Message(message="Actualización de usuario exitoso")
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al actualizar el usuario"
        )