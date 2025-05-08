from datetime import timedelta
from fastapi import APIRouter
from app.api.deps import SessionDep, SuperuserEmployee
from app.crud.employeeCrud import *
from app.core.security import create_access_token
from app.core.config import settings

router = APIRouter(prefix="/employee", tags=["employee"])


@router.post("/login/", response_model=SearchEmployeeResponse)
def login_employee(session: SessionDep, json: SearchEmployeeRequest) -> SearchEmployeeResponse:
    employee = authenticate_employee(session=session, json=json)
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
    access_token = create_access_token(subject=employee.id, expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    return SearchEmployeeResponse(
        id=employee.id,
        token=access_token
    )

"""
@router.get("/customers/")
def list_customers(
    session: SessionDep,
    _: SuperuserEmployee,
):
    return get_all_customers(session)


@router.patch("/customers/{customer_id}/status/")
def change_customer_status(
    customer_id: int,
    session: SessionDep,
    _: SuperuserEmployee,
    is_active: bool = Form(...),
):
    cust = update_customer_status(
        session=session,
        customer_id=customer_id,
        is_active=is_active,
    )
    return {
        "message": "Customer status updated",
        "customer_id": cust.id,
        "is_active": cust.is_active,
    }
"""
