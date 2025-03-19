from uuid import UUID

from fastapi import APIRouter, HTTPException, status

from app.db import SessionDep
from app.models.submission import (
    SubmissionCreate,
    SubmissionRead,
    SubmissionUpdate,
    SubmissionUpdateFeedback,
)
from app.services.participant_service import ParticipantService
from app.services.submission_service import SubmissionService

submission_router = APIRouter(prefix="/submissions", tags=["Submissions"])


@submission_router.post("/", response_model=SubmissionRead)
async def create_submission(submission: SubmissionCreate, session: SessionDep):
    submission_service = SubmissionService(session)
    participation_service = ParticipantService(session)

    participant = participation_service.get_participation(
        hacker_id=submission.hacker_id,
        program_id=submission.program_id,
    )
    if not participant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="This hacker is not participating in the program",
        )

    new_submission = submission_service.create_submission(
        participant=participant,
        submission_create=submission,
    )
    return new_submission


@submission_router.get("/{hacker_id}")
async def get_submissions(hacker_id: UUID, session: SessionDep):
    submission_service = SubmissionService(session)
    submissions = submission_service.get_submissions(hacker_id)
    return submissions


@submission_router.post("/{submission_id}")
async def update_submission(
    submission_id: UUID,
    submission_update: SubmissionUpdate,
    session: SessionDep,
):
    submission_service = SubmissionService(session)
    submission = submission_service.update_submission(submission_id, submission_update)
    return submission


@submission_router.post("/feedback/{submission_id}")
async def update_submission_feedback(
    submission_id: UUID,
    submission_update_feedback: SubmissionUpdateFeedback,
    session: SessionDep,
):
    submission_service = SubmissionService(session)
    submission = submission_service.update_submissionFeedback(submission_id, submission_update_feedback)
    return submission
