from datetime import timedelta
from fastapi import APIRouter
from app.api.deps import SessionDep
from app.core.config import settings
from app.schemas.login import Message
from app.crud.customerCrud import *
from app.core.security import create_access_token

router = APIRouter(prefix="/customer", tags=["customer"])

# ------------------------- Customer Actions ------------------------- #

@router.post("/register", response_model=Message)
def register(session: SessionDep, request: CreateCustomerRequest) -> Message:
    try:
        create_user(session=session, request=request)
        return Message(message="Registro de usuario exitoso")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al registrar el usuario: {e}"
        )


@router.post("/login", response_model=SearchCustomerResponse)
def login_customer(session: SessionDep, request: SearchCustomerRequest) -> SearchCustomerResponse:
    try:
        customer = authenticate_customer(session=session, request=request)
        if not customer:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Incorrect email or password"
            )
        elif not customer.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Usuario inactivo"
            )
        access_token = create_access_token(
            data={"sub": str(customer.id)},
            expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        return SearchCustomerResponse(
            id=customer.id,
            token=access_token
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al iniciar sesión: {e}"
        )


@router.post("/info", response_model=SearchMyInformationResponse)
def get_info(session: SessionDep, request: SearchMyInformationRequest) -> SearchMyInformationResponse:
    try:
        customer = get_customer_by_id(session=session, request=request)
        return SearchMyInformationResponse(
            id=customer.id,
            document_type=customer.document_type,
            full_name=customer.full_name,
            email=customer.email
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al traer la información el usuario {e}"
        )


@router.post("/update-customer", response_model=Message)
def update_customer(session: SessionDep, request: UpdateCustomerRequest) -> Message:
    try:
        update_user(session=session, request=request)
        return Message(message="Actualización de usuario exitosa")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al actualizar el usuario: {e}"
        )


# ------------------------- Employee Actions ------------------------- #


@router.post("/get-customer-by-id", response_model=SearchCustomersResponse)
def get_customer_by_id_employee(session: SessionDep, request: SearchCustomerByIdRequest) -> SearchCustomersResponse:
    try:
        customer = get_customer_by_id_crud(session=session, request=request)
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
            detail=f"Error inesperado al buscar los usuarios: {e}"
        )


@router.post("/update-customer-state", response_model=Message)
def update_customer_state(session: SessionDep, request: UpdateCustomerStateRequest) -> Message:
    try:
        update_customer_state_crud(session=session, request=request)
        return Message(message="Actualización de estado exitosa")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al actualizar el estado: {e}"
        )
