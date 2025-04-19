import uuid
from datetime import datetime
from typing import Optional, TYPE_CHECKING
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.vehicle import Vehicle
    from app.models.payment import Payment

class ParkingRegistrationCreate(SQLModel):
    vehicle_plate: str
    entry_time: datetime

class ParkingRegistration(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    entry_datetime: datetime = Field(default_factory=datetime.now)
    exit_datetime: datetime = Field(default_factory=datetime.now)
    plate: str = Field(foreign_key="vehicle.plate")
    vehicle: Vehicle = Relationship(back_populates="parking_registrations")
    payment: Optional["Payment"] = Relationship(back_populates="parking_registration")


class ParkingRegistrationPublic(SQLModel):
    id: uuid.UUID

class ParkingRegistrationsPublic(SQLModel):
    data: list[ParkingRegistrationPublic]
    count: int
