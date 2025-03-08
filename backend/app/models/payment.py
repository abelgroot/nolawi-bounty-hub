import enum
from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4

from sqlmodel import Column, Enum, Field, SQLModel


class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"


class Payment(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(
        default_factory=datetime.now,
        sa_column_kwargs={"onupdate": datetime.now},
    )
    amount: float
    status: PaymentStatus = Field(
        default=PaymentStatus.PENDING,
        sa_column=Column(Enum(PaymentStatus)),
    )
    paid_at: Optional[datetime] = None
    transaction_id: Optional[UUID] = None
