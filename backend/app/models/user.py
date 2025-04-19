import uuid
from typing import TYPE_CHECKING, Optional, List
from pydantic import EmailStr, Field as PydanticField
from sqlalchemy import BigInteger, Column
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .card import Cards
    from .item import Item
    from .parking import Parkings
    from .vehicle import Vehicles


class UserBase(SQLModel):
    email: EmailStr = PydanticField(max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: Optional[str] = PydanticField(default=None, max_length=255)


class UserCreate(UserBase):
    password: str = PydanticField(min_length=8, max_length=40)


class UserUpdate(UserBase):
    email: Optional[EmailStr] = PydanticField(default=None, max_length=255)
    password: Optional[str] = PydanticField(default=None, min_length=8, max_length=40)


class UserUpdateMe(SQLModel):
    full_name: Optional[str] = PydanticField(default=None, max_length=255)
    email: Optional[EmailStr] = PydanticField(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = PydanticField(min_length=8, max_length=40)
    new_password: str = PydanticField(min_length=8, max_length=40)


class Users(SQLModel, table=True):
    id: int = Field(sa_column=Column(BigInteger, primary_key=True))
    full_name: str = Field(index=True)
    email: str = Field(index=True)
    password_hash: str
    is_active: bool = Field(default=True)
    parking_id: int = Field(foreign_key="parkings.id")
    parking: "Parkings" = Relationship(back_populates="users")
    cards: List["Cards"] = Relationship(back_populates="user")
    vehicles: List["Vehicles"] = Relationship(back_populates="user")

class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


class Message(SQLModel):
    message: str


class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


class TokenPayload(SQLModel):
    sub: Optional[str] = None


class NewPassword(SQLModel):
    token: str
    new_password: str = PydanticField(min_length=8, max_length=40)


Users.update_forward_refs()

