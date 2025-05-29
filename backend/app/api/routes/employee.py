from datetime import timedelta
from fastapi import APIRouter
from app.api.deps import SessionDep
from app.crud.employeeCrud import *
from app.core.security import create_access_token
from app.core.config import settings
from app.models.message import Message

router = APIRouter(prefix="/employee", tags=["employee"])


# ------------------------- Employee Actions ------------------------- #

@router.post("/login", response_model=SearchEmployeeResponse)
def login_employee(session: SessionDep, request: SearchEmployeeRequest) -> SearchEmployeeResponse:
    try:
        employee = authenticate_employee(session=session, request=request)
        if not employee:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Correo o contraseña inválidos"
            )
        elif not employee.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Empleado inactivo"
            )
        access_token = create_access_token(
            data={"sub": str(employee.id)},
            expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        return SearchEmployeeResponse(
            id=employee.id,
            token=access_token
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.post("/update-employee", response_model=Message)
def update_employee(session: SessionDep, request: UpdateEmployeeRequest) -> Message:
    try:
        update_employee_crud(session=session, request=request)
        return Message(message="Actualización de empleado exitosa")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al actualizar el empleado: {e}"
        )


@router.post("/info", response_model=SearchInformationResponse)
def get_info(session: SessionDep, request: SearchInformationRequest) -> SearchInformationResponse:
    try:
        employee = get_employee_by_id(session=session, request=request)
        return SearchInformationResponse(
            id=employee.id,
            document_type=employee.document_type,
            full_name=employee.full_name,
            email=employee.email
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al traer la información el usuario: {e}"
        )
