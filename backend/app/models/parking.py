import uuid
from sqlmodel import Field, Relationship, SQLModel
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.employee import Employee
    from app.models.user import User
    from app.models.historical_rate import HistoricalRate



class ParkingBase(SQLModel):
    name: str = Field(unique=True, index=True, max_length=255)
    places: int
    address: str = Field(max_length=255)
    enterprise: str = Field(max_length=255)


class ParkingCreate(ParkingBase):
    minute_rate: int


class ParkingUpdate(ParkingBase):
    name: str = Field(unique=True, index=True, max_length=255)
    places: int
    minute_rate: int


class Parking(ParkingBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    users: list["User"] = Relationship(back_populates="owner", sa_relationship_kwargs={"cascade": "all, delete"})

    historical_rates: list["HistoricalRate"] | None = Relationship(
        back_populates="owner", cascade_delete=True
    )
    employees: list["Employee"] | None = Relationship(
        back_populates="owner", cascade_delete=True
    )


class ParkingPublic(ParkingBase):
    id: uuid.UUID


class ParkingsPublic(SQLModel):
    data: list[ParkingPublic]
    count: int
