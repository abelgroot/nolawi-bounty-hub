import enum
from datetime import datetime
from uuid import UUID, uuid4

from pydantic import BaseModel
from sqlmodel import Column, Enum, Field, SQLModel


class ProgramStatus(str, enum.Enum):
    OPEN = "open"
    CLOSED = "closed"


class BountyProgram(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str
    description: str
    reward_amount: float
    owner_id: UUID = Field(foreign_key="user.id", ondelete="CASCADE")
    status: ProgramStatus = Field(
        default=ProgramStatus.OPEN,
        sa_column=Column(Enum(ProgramStatus)),
    )
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(
        default_factory=datetime.now,
        sa_column_kwargs={"onupdate": datetime.now},
    )


class BountyProgramCreate(BaseModel):
    name: str
    description: str
    reward_amount: float


class BountyProgramUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    reward_amount: float | None = None
    status: ProgramStatus


class BountyProgramRead(SQLModel):
    id: UUID
    name: str
    description: str
    reward_amount: float
    owner_id: UUID
    status: ProgramStatus
    created_at: datetime
    updated_at: datetime
