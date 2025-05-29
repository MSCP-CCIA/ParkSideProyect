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
                status_code=400,
                detail="Incorrect email or password"
            )
        elif not employee.is_active:
            raise HTTPException(
                status_code=400,
                detail="Inactive user"
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
        print(e)
        raise HTTPException(
            status_code=400,
            detail="Incorrect email or password"
        )


@router.post("/update-employee", response_model=Message)
def update_employee(session: SessionDep, request: UpdateEmployeeRequest) -> Message:
    try:
        update_employee_crud(session=session, request=request)
        return Message(message="Actualización de empleado exitosa")
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al actualizar el empleado"
        )
