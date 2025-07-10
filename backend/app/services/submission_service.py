from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import desc
from sqlalchemy.orm import Session
from sqlmodel import select

from app.models.bountyprogram import BountyProgram, ProgramStatus
from app.models.participant import Participant
from app.models.submission import (
    Submission,
    SubmissionCreate,
    SubmissionRead,
    SubmissionUpdate,
    SubmissionUpdateFeedback,
)
from app.models.user import User


class SubmissionService:
    def __init__(self, session: Session):
        self.session = session

    def create_submission(
        self,
        participant: Participant,
        submission_create: SubmissionCreate,
    ) -> SubmissionRead:
        submission_query = select(Submission).where(
            Submission.hacker_id == submission_create.hacker_id,
            Submission.program_id == participant.program_id,
        )
        submission_result = self.session.execute(submission_query)
        current_submission = submission_result.scalar_one_or_none()

        if current_submission:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="submission already exists",
            )

        if participant.hacker_id != submission_create.hacker_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="you are not authorized to submit for this program",
            )
        program_query = select(BountyProgram).where(
            BountyProgram.id == participant.program_id
        )
        program_status = self.session.execute(program_query)
        program = program_status.scalar_one_or_none()
        if not program:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="no program found"
            )
        if program.status == ProgramStatus.CLOSED:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="program is closed",
            )

        submission = Submission(
            program_id=participant.program_id,
            hacker_id=submission_create.hacker_id,
            description=submission_create.description,
            details=submission_create.details,
            updater_id=None,
        )

        self.session.add(submission)
        self.session.commit()
        self.session.refresh(submission)
        self.session.close()

        return SubmissionRead.from_orm(submission)

    def get_submissions(self, hacker_id: UUID) -> list[Submission]:
        return (
            self.session.query(Submission)
            .where(Submission.hacker_id == hacker_id)
            .order_by(desc(Submission.updated_at))
            .all()
        )

    def get_all_sumissions(self) -> list[Submission]:
        return (
            self.session.query(Submission).order_by(desc(Submission.updated_at)).all()
        )

    def get_submissions_by_user(self, hacker_id: UUID) -> list[Submission]:
        return (
            self.session.query(Submission)
            .where(Submission.hacker_id == hacker_id)
            .order_by(desc(Submission.updated_at))
            .all()
        )

    def get_submission(self, submission_id: UUID) -> Submission:
        query = select(Submission).where(Submission.id == submission_id)
        result = self.session.execute(query)
        submission = result.scalar_one_or_none()
        if not submission:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="no submission found",
            )
        return submission

    def update_submission(
        self, submission_id: UUID, submission_update: SubmissionUpdate
    ) -> SubmissionRead:
        query = select(Submission).where(Submission.id == submission_id)
        result = self.session.execute(query)
        submission = result.scalar_one_or_none()
        if not submission:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="no submission found",
            )
        if submission_update.description:
            submission.description = submission_update.description
        if submission_update.details:
            submission.details = submission_update.details
        self.session.add(submission)
        self.session.commit()
        self.session.refresh(submission)
        self.session.close()

        return SubmissionRead.from_orm(submission)

    def update_submissionFeedback(
        self,
        submission_id: UUID,
        updater: User,
        submission_updatefeedback: SubmissionUpdateFeedback,
    ) -> SubmissionRead:
        query = select(Submission).where(Submission.id == submission_id)
        result = self.session.execute(query)
        submission = result.scalar_one_or_none()
        if not submission:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="no submission found",
            )

        submission.status = submission_updatefeedback.status
        submission.updater_id = updater.id
        if submission_updatefeedback.feedback:
            submission.feedback = submission_updatefeedback.feedback

        self.session.add(submission)
        self.session.commit()
        self.session.refresh(submission)
        self.session.close()

        return SubmissionRead.from_orm(submission)
