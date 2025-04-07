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
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    vehicle_plate: str
    entry_time: datetime
    exit_time: Optional[datetime] = None

    owner_id: uuid.UUID = Field(
        foreign_key="vehicle.id", nullable=False, ondelete="CASCADE"
    )
    owner: Optional["Vehicle"] = Relationship(back_populates="parking_registration")
    payment: Optional["Payment"] = Relationship(back_populates="parking_registration")


class ParkingRegistrationPublic(SQLModel):
    id: uuid.UUID

class ParkingRegistrationsPublic(SQLModel):
    data: list[ParkingRegistrationPublic]
    count: int
