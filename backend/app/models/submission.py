"""
submission model and related classes.
"""

import enum
from datetime import datetime
from uuid import UUID, uuid4

from sqlmodel import Column, Enum, Field, SQLModel

"""
submissionstatus enum class
"""


class SubmissionStatus(enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"


"""
submission model class
"""


class Submission(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    status: SubmissionStatus = Field(
        default=SubmissionStatus.PENDING, sa_column=Column(Enum(SubmissionStatus))
    )
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(
        default_factory=datetime.now,
        sa_column_kwargs={"onupdate": datetime.now},
    )
    program_id: UUID = Field(foreign_key="bountyprogram.id", ondelete="CASCADE")
    hacker_id: UUID = Field(foreign_key="user.id", ondelete="CASCADE")
    updater_id: UUID | None = Field(foreign_key="user.id", ondelete="CASCADE")
    description: str
    details: str
    feedback: str | None = None


"""
submission create model class
"""


class SubmissionCreate(SQLModel):
    program_id: UUID
    hacker_id: UUID
    description: str
    details: str


"""
submission update model class
"""


class SubmissionUpdate(SQLModel):
    description: str
    details: str


"""
submission update feedback model class
"""


class SubmissionUpdateFeedback(SQLModel):
    status: SubmissionStatus
    feedback: str | None = None


"""
submission read model class
"""


class SubmissionRead(SQLModel):
    id: UUID
    status: SubmissionStatus
    created_at: datetime
    updated_at: datetime
    program_id: UUID
    hacker_id: UUID
    updater_id: UUID | None
    description: str | None = None
    details: str | None = None
    feedback: str | None = None
