from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlmodel import select

from app.models.bountyprogram import BountyProgram
from app.models.participant import Participant
from app.models.payment import (
    Payment,
    PaymentCreate,
    PaymentRead,
    PaymentStatus,
    PaymentUpdate,
)
from app.models.submission import Submission, SubmissionStatus


class PaymentService:
    def __init__(self, session: Session):
        self.session = session

    def create_payment(self, payment_data: PaymentCreate) -> PaymentRead:
        submission_query = select(Submission).where(
            Submission.id == payment_data.submission_id
        )
        submission_result = self.session.execute(submission_query)
        submission = submission_result.scalar_one_or_none()

        if not submission:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="no submission for this program",
            )

        if submission.status != SubmissionStatus.APPROVED:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"submission is {submission.status}",
            )
        participant_query = select(Participant).where(
            Participant.id == submission.participant_id
        )
        participant_result = self.session.execute(participant_query)
        participant = participant_result.scalar_one_or_none()

        if not participant:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="no participant for this program",
            )

        program_query = select(BountyProgram).where(
            BountyProgram.id == participant.program_id
        )
        program_result = self.session.execute(program_query)
        program = program_result.scalar_one_or_none()

        if not program:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="no program for this participant",
            )

        payment = Payment(
            submission_id=payment_data.submission_id,
            amount=program.reward_amount,
            transaction_id=payment_data.transaction_id,
            admin_id=payment_data.admin_id,
            status=PaymentStatus.PENDING,
        )

        self.session.add(payment)
        self.session.commit()
        self.session.refresh(payment)
        self.session.close()

        return PaymentRead.from_orm(payment)

    def get_payments(self) -> list[Payment]:
        return self.session.query(Payment).all()

    def get_payment(self, payment_id: UUID) -> Payment:
        query = select(Payment).where(Payment.id == payment_id)
        result = self.session.execute(query)
        payment = result.scalar_one_or_none()
        if not payment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="no payment found",
            )
        return payment

    def update_payment(
        self, payment_id: UUID, payment_update: PaymentUpdate
    ) -> PaymentRead:
        query = select(Payment).where(Payment.id == payment_id)
        result = self.session.execute(query)
        payment = result.scalar_one_or_none()
        if not payment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="no payment found",
            )
        if payment_update.status:
            payment.status = PaymentStatus.PAID
        if payment_update.paid_at:
            payment.paid_at = payment_update.paid_at
        if payment_update.transaction_id:
            payment.transaction_id = payment_update.transaction_id

        self.session.add(payment)
        self.session.commit()
        self.session.refresh(payment)
        self.session.close()

        return PaymentRead.from_orm(payment)
