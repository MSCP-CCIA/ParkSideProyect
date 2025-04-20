import uuid
from sqlmodel import Field, Relationship, SQLModel
from typing import TYPE_CHECKING, Optional, List

if TYPE_CHECKING:
    from app.models.historical_rate import HistoricalRate
    from app.models.customer import Customer
    from app.models.employee import Employee


class Parking(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    places: int
    address: str
    enterprise: str

    historical_rates: List["HistoricalRate"] = Relationship(back_populates="parking")
    customers: List["Customer"] = Relationship(back_populates="parking")
    employees: List["Employee"] = Relationship(back_populates="parking")

