import uuid

from sqlmodel import Field, Relationship, SQLModel

from backend.app.models.parking_registration import ParkingRegistration
from backend.app.models.user import User


class VehicleRegister(SQLModel):
    plate: str = Field(min_length=6, max_length=6)
    type: str = Field(default=None, max_length=255)
    model: str = Field(default=None, max_length=255)
    color: str = Field(default=None, max_length=255)


class Vehicle(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    plate: str = Field(min_length=6, max_length=6)
    type: str = Field(default=None, max_length=255)
    model: str = Field(default=None, max_length=255)
    color: str = Field(default=None, max_length=255)
    parking_registration: list["ParkingRegistration"] | None = Relationship(
        back_populates="owner", cascade_delete=True
    )
    owner_id: uuid.UUID = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")
    owner: User = Relationship(back_populates="vehicles")
