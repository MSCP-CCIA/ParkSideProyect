import uuid
from datetime import datetime
from pydantic import field_validator
from sqlmodel import Field, Relationship, SQLModel
from creditcard import CreditCard
from backend.app.models.user import User


class CardBase(SQLModel):
    full_name_user: str = Field(max_length=255)
    card_type: str = Field(default=None, max_length=255)


class CardRegister(SQLModel):
    number_card: str = Field(min_length=16, max_length=16)
    cvc_code: str = Field(min_length=3, max_length=3)
    expiration_date: str

    @field_validator("number_card")
    @classmethod
    def validate_card_number(cls, value):
        """Valida el número de la tarjeta con la librería creditcard"""
        try:
            card = CreditCard(value)
            if not card.is_valid():
                raise ValueError("El número de tarjeta no es válido")
            return value
        except ValueError:
            raise ValueError("El número de tarjeta no es válido")

    @field_validator("cvc_code")
    @classmethod
    def validate_cvc(cls, value):
        """Valida que el CVC solo contenga números y tenga la longitud correcta"""
        if not value.isdigit() or len(value) not in (3, 4):
            raise ValueError("CVC inválido")
        return value

    @field_validator("expiration_date")
    @classmethod
    def validate_expiration_date(cls, value):
        """
        Valida que la fecha de expiración tenga el formato MM/YYYY
        y no esté expirada
        """
        try:
            exp_date = datetime.strptime(value, "%m/%Y").date()
            if exp_date < datetime.today().date():
                raise ValueError("La tarjeta ya está expirada")
        except ValueError:
            raise ValueError("Formato incorrecto. Use MM/YYYY")
        return value


class CardUpdateMe(SQLModel):
    number_card: str = Field(min_length=16, max_length=16)
    cvc_code: str = Field(min_length=3, max_length=3)
    expiration_date: str

    @field_validator("number_card")
    @classmethod
    def validate_card_number(cls, value):
        return CardRegister.validate_card_number(value)

    @field_validator("cvc_code")
    @classmethod
    def validate_cvc(cls, value):
        return CardRegister.validate_cvc(value)

    @field_validator("expiration_date")
    @classmethod
    def validate_expiration_date(cls, value):
        return CardRegister.validate_expiration_date(value)


class Card(CardBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_number_card: str
    hashed_cvc_code: str
    hashed_expiration_date: str
    owner_id: uuid.UUID = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")
    owner: "User" = Relationship(back_populates="cards")


class CardPublic(CardBase):
    id: uuid.UUID


class CardsPublic(SQLModel):
    data: list[CardPublic]
    count: int
