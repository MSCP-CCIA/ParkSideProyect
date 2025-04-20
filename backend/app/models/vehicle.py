import uuid
from typing import TYPE_CHECKING, List
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.parking_registration import ParkingRegistrations
    from app.models.user import Users

class VehicleRegister(SQLModel):
    plate: str = Field(min_length=6, max_length=6)
    type: str = Field(default=None, max_length=255)
    model: str = Field(default=None, max_length=255)
    color: str = Field(default=None, max_length=255)

class Vehicles(SQLModel, table=True):
    plate: str = Field(primary_key=True)
    type: str
    model: str
    color: str
    user_id: int = Field(foreign_key="users.id")

    user: "Users" = Relationship(back_populates="vehicles")
    parking_registrations: List["ParkingRegistrations"] = Relationship(back_populates="vehicle")
