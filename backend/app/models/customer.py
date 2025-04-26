import uuid
from typing import TYPE_CHECKING, Optional, List
from sqlalchemy import BigInteger, Column
from sqlmodel import Field, Relationship, SQLModel
from pydantic import BaseModel
from app.core.security import get_password_hash

if TYPE_CHECKING:
    from app.models.parking import Parking
    from app.models.card import Card
    from app.models.vehicle import Vehicle

# 📦 Modelo de Base de Datos (Tabla Customer)
class Customer(SQLModel, table=True):
    id: int = Field(sa_column=Column(BigInteger, primary_key=True))
    full_name: str = Field(index=True)
    email: str = Field(index=True)
    password_hash: str
    is_active: bool = Field(default=True)
    parking_id: int = Field(foreign_key="parking.id")

    parking: Optional["Parking"] = Relationship(back_populates="customers")
    cards: List["Card"] = Relationship(back_populates="customer")
    vehicles: List["Vehicle"] = Relationship(back_populates="customer")

# 🛠️ Esquemas de Entrada y Salida (Pydantic)

class UserBase(BaseModel):
    full_name: str
    email: str
    parking_id: int

# 👉 Esquema para CREAR un usuario (incluye contraseña en texto plano)
class UserCreate(UserBase):
    password: str

# 👉 Esquema para ACTUALIZAR un usuario (parcial, opcional)
class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    parking_id: Optional[int] = None

# 👉 Esquema para RESPUESTA de un usuario
class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

# 🚀 Utilidades directas en este archivo (opcional, pero útil)

def create_customer_model_from_usercreate(user_in: UserCreate) -> Customer:
    """
    Función que crea un modelo Customer directamente desde un esquema UserCreate,
    hasheando automáticamente la contraseña.
    """
    return Customer(
        full_name=user_in.full_name,
        email=user_in.email,
        password_hash=get_password_hash(user_in.password),
        parking_id=user_in.parking_id,
    )
