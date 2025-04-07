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
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    plate: str = Field(min_length=6, max_length=6)
    type: str = Field(default=None, max_length=255)
    model: str = Field(default=None, max_length=255)
    color: str = Field(default=None, max_length=255)

    parking_registration: list["ParkingRegistration"] | None = Relationship(
        back_populates="owner", sa_relationship_kwargs={"cascade": "all, delete"}
    )

    owner_id: uuid.UUID = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")
    owner: "User" = Relationship(back_populates="vehicles")
