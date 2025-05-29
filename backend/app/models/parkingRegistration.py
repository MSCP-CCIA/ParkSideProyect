from datetime import datetime
from typing import Optional, TYPE_CHECKING

from pydantic import BaseModel
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.payment import Payment

class ParkingRegistration(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    entry_datetime: datetime = Field(default_factory=datetime.now)
    exit_datetime: datetime | None = Field(default_factory=None)
    plate: str = Field(foreign_key="vehicle.plate")

    payment: Optional["Payment"] = Relationship(back_populates="parking_registration")

# ------------------------- ML and Employee Actions ------------------------- #

# Register or Update a parking record by reading the plate or employee

class EntryOrUpdateVehicleRequest(BaseModel):
    plate: str

class EntryVehicle(BaseModel):
    entry_datetime: datetime
    exit_datetime: datetime | None
    plate: str
