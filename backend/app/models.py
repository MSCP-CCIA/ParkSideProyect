import uuid
from datetime import datetime
from pydantic import EmailStr, field_validator
from sqlmodel import Field, Relationship, SQLModel


# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    items: list["Item"] = Relationship(
        back_populates="owner", cascade_delete=True)
    cards: list["Card"] = Relationship(
        back_populates="owner", cascade_delete=True)

# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


def luhn_check(card_number: str) -> bool:
    digits = [int(d) for d in card_number]
    checksum = 0
    double = False
    for i in range(len(digits) - 1, -1, -1):
        num = digits[i]
        if double:
            num *= 2
            if num > 9:
                num -= 9
        checksum += num
        double = not double
    return checksum % 10 == 0


# Base Model for Card
class CardBase(SQLModel):
    full_name_user: str = Field(max_length=255)
    card_type: str = Field(default=None, max_length=255)


# Properties to receive on card creation
class CardRegister(SQLModel):
    number_card: str = Field(min_length=16, max_length=16)
    cvc_code: str = Field(min_length=3, max_length=3)
    expiration_date: str

    @field_validator("number_card")
    @classmethod
    def validate_card_number(cls, value):
        """Valida el número de la tarjeta con el Algoritmo de Luhn"""
        if not value.isdigit():
            raise ValueError("El número de tarjeta solo debe contener dígitos")
        if not luhn_check(value):
            raise ValueError("El número de tarjeta no es válido según el algoritmo de Luhn")
        return value

    @field_validator("expiration_date")
    @classmethod
    def validate_expiration_date(cls, value):
        """Valida que la fecha de expiración tenga el formato MM/YYYY y no esté expirada"""
        try:
            exp_date = datetime.strptime(value, "%m/%Y").date()
            if exp_date < datetime.today().date():
                raise ValueError("La tarjeta ya está expirada")
        except ValueError:
            raise ValueError("Formato incorrecto. Use MM/YYYY")
        return value


# Properties to receive via API on update
class CardUpdateMe(SQLModel):
    number_card: str = Field(min_length=16, max_length=16)
    cvc_code: str = Field(min_length=3, max_length=3)
    expiration_date: str  # Se validará igual que en `CardRegister`
    @field_validator("number_card")
    @classmethod
    def validate_card_number(cls, value):
        return CardRegister.validate_card_number(value)

    @field_validator("expiration_date")
    @classmethod
    def validate_expiration_date(cls, value):
        return CardRegister.validate_expiration_date(value)


# Database model, database table inferred from class name
class Card(CardBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_number_card: str
    hashed_cvc_code: str
    hashed_expiration_date: str
    owner_id: uuid.UUID = Field(foreign_key="user.id", nullable=False)
    owner: "User" = Relationship(back_populates="cards")

# Properties to return via API
class CardPublic(CardBase):
    id: uuid.UUID


class CardsPublic(SQLModel):
    data: list[CardPublic]
    count: int


# Shared Properties
class ParkingBase(SQLModel):
    name: str = Field(unique=True, index=True, max_length=255)
    places: int
    address: str = Field(max_length=255)
    enterprise: str = Field(max_length=255)


# Properties to receive via API on creation
class ParkingCreate(ParkingBase):
    minute_rate: int


# Properties to receive via API on update, all are optional
class ParkingUpdate(ParkingBase):
    name: str = Field(unique=True, index=True, max_length=255)
    places: int
    minute_rate: int


# Database model, database table inferred from class name
class Parking(ParkingBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(foreign_key="user.id", nullable=False)


# Properties to return via API, id is always required
class ParkingPublic(ParkingBase):
    id: uuid.UUID


class ParkingsPublic(SQLModel):
    data: list[ParkingPublic]
    count: int


# Shared properties
class ItemBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)


# Properties to receive on item creation
class ItemCreate(ItemBase):
    pass


# Properties to receive on item update
class ItemUpdate(ItemBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore


# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(max_length=255)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="items")


# Properties to return via API, id is always required
class ItemPublic(ItemBase):
    id: uuid.UUID
    owner_id: uuid.UUID


class ItemsPublic(SQLModel):
    data: list[ItemPublic]
    count: int


# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)
