from datetime import datetime
from uuid import UUID, uuid4

from pydantic import BaseModel
from sqlmodel import Field, SQLModel


class Participant(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.now)
    hacker_id: UUID = Field(foreign_key="user.id", ondelete="CASCADE")
    program_id: UUID = Field(foreign_key="bountyprogram.id", ondelete="CASCADE")


class ParticipantCreate(BaseModel):
    hacker_id: UUID = Field(foreign_key="user.id")
    program_id: UUID = Field(foreign_key="bountyprogram.id")


class ParticipantRead(SQLModel):
    id: UUID
    hacker_id: UUID = Field(foreign_key="user.id")
    program_id: UUID = Field(foreign_key="bountyprogram.id")
    created_at: datetime
