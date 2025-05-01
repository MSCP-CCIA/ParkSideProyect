# app/crud/employeeCrud.py

from sqlmodel import select, Session
from fastapi import HTTPException
from passlib.exc import UnknownHashError

from app.models.employee import Employee
from app.models.customer import Customer
from app.core.security import verify_hash

def authenticate_employee(session: Session, email: str, password: str) -> Employee | None:
    """
    Busca un Employee por email y verifica contraseña.
    Soporta tanto hashes bcrypt como texto plano (fallback).
    """
    stmt = select(Employee).where(Employee.email == email)
    emp = session.exec(stmt).one_or_none()
    if not emp:
        return None

    # 1) Intento de verificación bcrypt
    try:
        if verify_hash(password, emp.password_hash):
            return emp
    except UnknownHashError:
        # 2) Fallback a simple compare si no es un hash bcrypt válido
        if password == emp.password_hash:
            return emp
    except Exception:
        # Cualquier otro error interno lo silenciamos y retornamos None
        return None

    # No coinciden
    return None

def get_all_customers(session: Session) -> list[Customer]:
    """
    Retorna todos los Customer.
    """
    return session.exec(select(Customer)).all()

def update_customer_status(session: Session, customer_id: int, is_active: bool) -> Customer:
    """
    Actualiza el campo is_active de un Customer.
    """
    cust = session.get(Customer, customer_id)
    if not cust:
        raise HTTPException(status_code=404, detail="Customer not found")
    cust.is_active = is_active
    session.add(cust)
    session.commit()
    session.refresh(cust)
    return cust
