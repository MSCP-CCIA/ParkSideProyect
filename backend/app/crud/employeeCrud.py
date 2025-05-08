from sqlmodel import select, Session
from fastapi import HTTPException
from app.models.employee import *
from app.core.security import hash_password


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
"""
def get_all_customers(session: Session) -> list[Customer]:
    return session.exec(select(Customer)).all()

def update_customer_status(session: Session, customer_id: int, is_active: bool) -> Customer:
    cust = session.get(Customer, customer_id)
    if not cust:
        raise HTTPException(status_code=404, detail="Customer not found")
    cust.is_active = is_active
    session.add(cust)
    session.commit()
    session.refresh(cust)
    return cust
"""