import uuid
from sqlmodel import Field, Relationship, SQLModel
from typing import TYPE_CHECKING, Optional

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


class Parking(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    places: int
    address: str
    enterprise: str
    historical_rates: list["HistoricalRate"] = Relationship(back_populates="parking")
    users: list["User"] = Relationship(back_populates="parking")
    employees: list["Employee"] = Relationship(back_populates="parking")


class ParkingPublic(ParkingBase):
    id: uuid.UUID


class ParkingsPublic(SQLModel):
    data: list[ParkingPublic]
    count: int
