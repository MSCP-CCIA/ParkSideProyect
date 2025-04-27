from pydantic import BaseModel
from typing import Optional

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None
