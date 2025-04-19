import uuid
from typing import TYPE_CHECKING
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.parking_registration import ParkingRegistration
    from app.models.user import User

class VehicleRegister(SQLModel):
    plate: str = Field(min_length=6, max_length=6)
    type: str = Field(default=None, max_length=255)
    model: str = Field(default=None, max_length=255)
    color: str = Field(default=None, max_length=255)

class Vehicle(SQLModel, table=True):
    plate: str = Field(primary_key=True)
    type: str
    model: str
    color: str
    user_id: int = Field(foreign_key="user.id")

    user: User = Relationship(back_populates="vehicles")
    parking_registrations: list["ParkingRegistration"] = Relationship(back_populates="vehicle")
