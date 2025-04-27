from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenPayload(BaseModel):
    sub: int | None = None  # ID del usuario

class NewPassword(BaseModel):
    token: str
    new_password: str

class Message(BaseModel):
    message: str
