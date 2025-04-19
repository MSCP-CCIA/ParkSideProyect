import uuid
from sqlmodel import Field, Relationship, SQLModel
from typing import TYPE_CHECKING, Optional, List

if TYPE_CHECKING:
    from app.models.employee import Employees
    from app.models.user import Users
    from app.models.historical_rate import HistoricalRates



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


class Parkings(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    places: int
    address: str
    enterprise: str
    historical_rates: List["HistoricalRates"] = Relationship(back_populates="parking")
    users: List["Users"] = Relationship(back_populates="parking")
    employees: List["Employees"] = Relationship(back_populates="parking")


class ParkingPublic(ParkingBase):
    id: uuid.UUID


class ParkingsPublic(SQLModel):
    data: list[ParkingPublic]
    count: int
