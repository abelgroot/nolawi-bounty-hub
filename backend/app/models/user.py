import enum
from datetime import datetime
from uuid import UUID, uuid4

from pydantic import BaseModel, EmailStr
from pydantic import BaseModel as PydanticBaseModel
from sqlmodel import Column, Enum, Field, SQLModel


class UserType(str, enum.Enum):
    HACKER = "hacker"
    COMPANY = "company"
    ADMIN = "admin"


class User(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str
    email: EmailStr = Field(unique=True)
    password: str
    role: UserType = Field(
        sa_column=Column(Enum(UserType)),
    )
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(
        default_factory=datetime.now,
        sa_column_kwargs={"onupdate": datetime.now},
    )


class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str
    role: UserType


class UserRead(SQLModel):
    id: UUID
    email: EmailStr
    name: str
    role: UserType
    created_at: datetime
    updated_at: datetime


class UserUpdate(BaseModel):
    email: EmailStr | None = None
    password: str | None = None


class Token(PydanticBaseModel):
    access_token: str
    token_type: str


class AuthUser(PydanticBaseModel):
    user: UserRead
    token: Token
