from uuid import UUID

from fastapi import HTTPException, status
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
from app.models.user import User, UserType


class SubmissionService:
    def __init__(self, session: Session):
        self.session = session

    def create_submission(self, submission_create: SubmissionCreate) -> SubmissionRead:
        submission_query = select(Submission).where(
            Submission.participant_id == submission_create.participant_id
        )
        submission_result = self.session.execute(submission_query)
        current_submission = submission_result.scalar_one_or_none()

        if current_submission:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="submission already exists",
            )

        participant_query = select(Participant).where(
            Participant.id == submission_create.participant_id
        )
        result = self.session.execute(participant_query)
        participant = result.scalar_one_or_none()

        if not participant:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="no participant in this program",
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
            participant_id=submission_create.participant_id,
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

    def get_submissions(self) -> list[Submission]:
        return self.session.query(Submission).all()

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
        self, submission_id: UUID, submission_updatefeedback: SubmissionUpdateFeedback
    ) -> SubmissionRead:
        query = select(Submission).where(Submission.id == submission_id)
        result = self.session.execute(query)
        submission = result.scalar_one_or_none()
        if not submission:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="no submission found",
            )

        if submission_updatefeedback.updater_id:
            user_query = select(User).where(
                User.id == submission_updatefeedback.updater_id
            )
            user_result = self.session.execute(user_query)
            user = user_result.scalar_one_or_none()
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="no updater user id found",
                )
            if user.role != UserType.ADMIN:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="not authorized to update submission",
                )
        if submission_updatefeedback.status:
            submission.status = submission_updatefeedback.status
        if submission_updatefeedback.updater_id:
            submission.updater_id = submission_updatefeedback.updater_id
        if submission_updatefeedback.feedback:
            submission.feedback = submission_updatefeedback.feedback
        self.session.add(submission)
        self.session.commit()
        self.session.refresh(submission)
        self.session.close()

        return SubmissionRead.from_orm(submission)
