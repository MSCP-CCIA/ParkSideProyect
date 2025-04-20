import uuid
from datetime import datetime
from typing import Optional, TYPE_CHECKING
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.vehicle import Vehicles
    from app.models.payment import Payments

class ParkingRegistrationCreate(SQLModel):
    vehicle_plate: str
    entry_time: datetime

class ParkingRegistrations(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    entry_datetime: datetime = Field(default_factory=datetime.now)
    exit_datetime: datetime = Field(default_factory=datetime.now)
    plate: str = Field(foreign_key="vehicles.plate")
    vehicle: "Vehicles" = Relationship(back_populates="parking_registrations")
    payment: Optional["Payments"] = Relationship(back_populates="parking_registration")


class ParkingRegistrationPublic(SQLModel):
    id: uuid.UUID

class ParkingRegistrationsPublic(SQLModel):
    data: list[ParkingRegistrationPublic]
    count: int
