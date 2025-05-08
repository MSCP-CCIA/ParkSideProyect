from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException
from app.api.deps import CurrentUser, SessionDep, get_current_active_superuser
from app.core.config import settings
from app.schemas.login import Message, NewPassword, Token
from app.crud.customerCrud import *
from app.core.security import create_access_token

router = APIRouter(prefix="/customer", tags=["login"])


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
def login_customer(session: SessionDep, json: SearchCustomerRequest) -> SearchCustomerResponse:
    customer = authenticate_customer(session=session, json=json)
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


@router.post("/me/", response_model=SearchMyInformationResponse)
def get_me(session: SessionDep, json: SearchMyInformationRequest) -> SearchMyInformationResponse:
    try:
        customer = get_customer_by_id(session=session, json=json)
        return SearchMyInformationResponse(
            id=customer.id,
            full_name=customer.full_name,
            email=customer.email,
            password_hash=customer.password_hash
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al registrar el usuario"
        )


@router.post("", response_model=SearchCustomersResponse)
def get_rates(session: SessionDep, json: SearchCustomersRequest) -> SearchCustomersResponse:
    try:
        customers = get_historical_rates(session=session, json=json)
        if not customers:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Historico de tarifas no encontrado"
            )
        customers_response = [
            SearchCustomers(
                id=customer.id,
                full_name=customer.full_name,
                #
                email=customer.email,
                is_active=customer.is_active
            )
            for customer in customers
        ]
        return SearchCustomersResponse(customers=customers_response)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al buscar los vehículos: {str(e)}"
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
