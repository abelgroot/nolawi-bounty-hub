"""
payment model class
"""

import enum
from datetime import datetime
from uuid import UUID, uuid4

from sqlmodel import Column, Enum, Field, SQLModel

"""
payment create model class
"""


class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    PAID = "paid"


"""
payment update model class
"""


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
    submission_id: UUID = Field(foreign_key="submission.id", ondelete="CASCADE")
    admin_id: UUID = Field(foreign_key="user.id", ondelete="CASCADE")
    paid_at: datetime | None = None
    transaction_id: UUID | None = None


"""
payment read model class
"""


class PaymentCreate(SQLModel):
    amount: float
    status: PaymentStatus = PaymentStatus.PENDING
    submission_id: UUID
    admin_id: UUID
    transaction_id: UUID | None = None
    paid_at: datetime | None = None


"""payment read model class"""


class PaymentRead(SQLModel):
    id: UUID
    created_at: datetime
    updated_at: datetime
    amount: float
    status: PaymentStatus
    submission_id: UUID
    admin_id: UUID
    paid_at: datetime | None = None
    transaction_id: UUID | None = None


"""payment update model class"""


class PaymentUpdate(SQLModel):
    status: PaymentStatus
    paid_at: datetime
    transaction_id: UUID
