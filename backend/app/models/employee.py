import uuid
from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel

from backend.app.models.parking import Parking


class EmployeeBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = True
    full_name: str | None = Field(default=None, max_length=255)
    phone: int
    job_position: str = Field(max_length=255)


class EmployeeCreate(EmployeeBase):
    password: str = Field(min_length=8, max_length=40)


class EmployeeUpdate(EmployeeBase):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = True
    full_name: str | None = Field(default=None, max_length=255)
    phone: int
    job_position: str = Field(max_length=255)


class EmployeeUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)
    phone: int


class EmployeeUpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


class Employee(EmployeeBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    owner_id: uuid.UUID = Field(
        foreign_key="parking.id", nullable=False, ondelete="CASCADE")
    owner: Parking | None = Relationship(back_populates="employees")


class EmployeePublic(EmployeeBase):
    id: uuid.UUID


class EmployeesPublic(SQLModel):
    data: list[EmployeePublic]
    count: int
