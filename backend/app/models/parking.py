from pydantic import BaseModel
from sqlmodel import Field, Relationship, SQLModel
from typing import TYPE_CHECKING, List

if TYPE_CHECKING:
    from app.models.historicalRate import HistoricalRate
    from app.models.customer import Customer
    from app.models.employee import Employee


class Parking(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    places: int
    address: str
    enterprise: str

    historical_rates: List["HistoricalRate"] = Relationship(back_populates="parking")
    customers: List["Customer"] = Relationship(back_populates="parking")
    employees: List["Employee"] = Relationship(back_populates="parking")

class SearchParkingRequest(BaseModel):
    employee_id: int

class SearchParkingResponse(BaseModel):
    name: str
    address: str
    enterprise: str