from pydantic import BaseModel
from sqlalchemy import Column, BigInteger
from sqlmodel import Field, Relationship, SQLModel
from typing import TYPE_CHECKING, List

if TYPE_CHECKING:
    from app.models.parking import Parking
    from app.models.payment import Payment

class Employee(SQLModel, table=True):
    id: int = Field(sa_column=Column(BigInteger, primary_key=True))
    full_name: str = Field(index=True)
    email: str = Field(index=True)
    password_hash: str
    phone: int
    job_position: str
    is_active: bool = Field(default=True)
    parking_id: int = Field(foreign_key="parking.id")

    parking: "Parking" = Relationship(back_populates="employees")
    payments: List["Payment"] = Relationship(back_populates="employee")

# ------------------------- Employee Actions ------------------------- #

# Login

class SearchEmployeeRequest(BaseModel):
    email: str
    password: str

class SearchEmployeeResponse(BaseModel):
    id: int
    token: str

# Update Employee Info

class UpdateEmployeeRequest(BaseModel):
    id: int
    full_name: str