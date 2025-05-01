import uuid
from datetime import datetime
from typing import Optional, TYPE_CHECKING

from pydantic import BaseModel
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.vehicle import Vehicle
    from app.models.payment import Payment

class ParkingRegistration(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    entry_datetime: datetime = Field(default_factory=datetime.now)
    exit_datetime: datetime = Field(default_factory=None)
    plate: str = Field(foreign_key="vehicle.plate")

    vehicle: "Vehicle" = Relationship(back_populates="parking_registrations")
    payment: Optional["Payment"] = Relationship(back_populates="parking_registration")

class EntryVehicleRequest(BaseModel):
    plate: str

class EntryVehicleResponse(BaseModel):
    id: int
    entry_datetime: datetime
    exit_datetime: None
    plate: str

