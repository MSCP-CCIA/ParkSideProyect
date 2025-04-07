import uuid
from typing import TYPE_CHECKING, Optional
from pydantic import EmailStr, Field as PydanticField
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .card import Card
    from .item import Item
    from .parking import Parking
    from .vehicle import Vehicle


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


class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str

    items: list["Item"] = Relationship(back_populates="owner", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    cards: list["Card"] = Relationship(back_populates="owner", sa_relationship_kwargs={"cascade": "all, delete"})
    vehicles: list["Vehicle"] = Relationship(back_populates="owner", sa_relationship_kwargs={"cascade": "all, delete"})


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


User.update_forward_refs()

