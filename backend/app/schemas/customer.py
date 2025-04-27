from typing import Optional
from pydantic import BaseModel

# Base para esquemas
class CustomerBase(BaseModel):
    full_name: str
    email: str
    parking_id: int

# Para crear un nuevo cliente
class CustomerCreate(CustomerBase):
    password: str

# Para actualizar cliente
class CustomerUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    parking_id: Optional[int] = None

# Para registrar cliente (signup)
class CustomerRegister(CustomerBase):
    password: str

# Para retornar datos públicos
class CustomerPublic(CustomerBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True  # Esto reemplaza orm_mode en Pydantic v2
