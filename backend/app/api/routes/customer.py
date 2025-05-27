from datetime import timedelta
from fastapi import APIRouter
from app.api.deps import SessionDep
from app.core.config import settings
from app.schemas.login import Message
from app.crud.customerCrud import *
from app.core.security import create_access_token

router = APIRouter(prefix="/customer", tags=["customer"])

# ------------------------- Customer Actions ------------------------- #

@router.post("/register/", response_model=Message)
def register(session: SessionDep, json: CreateCustomerRequest) -> Message:
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
    access_token = create_access_token(
        data={"sub": str(customer.id)},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return SearchCustomerResponse(
        id=customer.id,
        token=access_token
    )


@router.post("/info/", response_model=SearchMyInformationResponse)
def get_info(session: SessionDep, json: SearchMyInformationRequest) -> SearchMyInformationResponse:
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


@router.post("/update-customer/", response_model=Message)
def update_customer(session: SessionDep, json: UpdateCustomerRequest) -> Message:
    try:
        update_user(session=session, json=json)
        return Message(message="Actualización de usuario exitosa")
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al actualizar el usuario"
        )


# ------------------------- Employee Actions ------------------------- #


@router.post("/get-customer-by-id/", response_model=SearchCustomersResponse)
def get_customer_by_id(session: SessionDep, json: SearchCustomerByIdRequest) -> SearchCustomersResponse:
    try:
        customer = get_customer_by_id_crud(session=session, json=json)
        if not customer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontraron registros en la base de datos"
            )
        return SearchCustomersResponse(
            id=customer.id,
            full_name=customer.full_name,
            email=customer.email,
            document_type=customer.document_type,
            is_active=customer.is_active
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al buscar los usuarios: {str(e)}"
        )


@router.post("/update-customer-state/", response_model=Message)
def update_customer_state(session: SessionDep, json: UpdateCustomerStateRequest) -> Message:
    try:
        update_customer_state_crud(session=session, json=json)
        return Message(message="Actualización de estado exitosa")
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al actualizar el estado"
        )
