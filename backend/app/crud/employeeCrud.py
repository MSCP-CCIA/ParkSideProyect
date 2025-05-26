from sqlmodel import select, Session
from fastapi import HTTPException, status
from app.models.employee import *
from app.core.security import hash_password

# ------------------------- Employee Actions ------------------------- #

def get_employee_by_email(*, session: Session, email: str) -> Employee | None:
    statement = select(Employee).where(Employee.email == email)
    session_employee = session.exec(statement).first()
    return session_employee


def authenticate_employee(*, session: Session, json: SearchEmployeeRequest) -> Employee | None:
    employee = get_employee_by_email(session=session, email=json.email)
    if not employee:
        return None
    if not hash_password(json.password) != employee.password_hash:
        return None
    return employee


def update_employee_crud(*, session: Session, json: UpdateEmployeeRequest) -> Employee:
    try:
        statement = select(Employee).where(Employee.id == json.id)
        employee = session.exec(statement).first()
        if not employee:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Empleado no encontrado"
            )
        update_data = json.model_dump(exclude_unset=True, exclude={"id"})
        for field, value in update_data.items():
            setattr(employee, field, value)
        session.add(employee)
        session.commit()
        session.refresh(employee)
        return employee
    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al actualizar el empleado: {str(e)}"
        )