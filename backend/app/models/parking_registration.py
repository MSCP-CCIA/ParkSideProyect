import uuid
from datetime import datetime
from sqlmodel import Field, Relationship, SQLModel
from backend.app.models.payment import Payment
from backend.app.models.vehicle import Vehicle


class ParkingRegistrationRegister(SQLModel):
    vehicle_entry_datetime: datetime
    vehicle_exit_datetime: datetime | None


class ParkingRegistrationUpdate(SQLModel):
    vehicle_entry_datetime: datetime
    vehicle_exit_datetime: datetime


class ParkingRegistration(SQLModel):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    vehicle_entry_datetime: datetime
    vehicle_exit_datetime: datetime | None
    owner_id: uuid.UUID = Field(foreign_key="vehicle.id", nullable=False)
    owner: Vehicle | None = Relationship(back_populates="vehicles")
    payment: "Payment" | None = Relationship(
        back_populates="user",
        sa_relationship_kwargs={"uselist": False, "cascade": "all, delete"}
    )
