from pydantic import BaseModel


class ClientMessage(BaseModel):
    type: str
    message: str | None = None
    role: str | None = None
    mode: str | None = None


class ServerMessage(BaseModel):
    type: str
    message: str | dict | None = None