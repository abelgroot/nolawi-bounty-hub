from uuid import UUID

from fastapi import APIRouter

from app.db import SessionDep
from app.models.submission import SubmissionCreate, SubmissionRead, SubmissionUpdate
from app.services.submission_service import SubmissionService

submission_router = APIRouter(prefix="/submissions", tags=["Submissions"])


@submission_router.post("/", response_model=SubmissionRead)
async def create_submission(submission: SubmissionCreate, session: SessionDep):
    submission_service = SubmissionService(session)
    new_submission = submission_service.create_submission(submission)
    return new_submission


@submission_router.get("/")
async def get_submissions(session: SessionDep):
    submission_service = SubmissionService(session)
    submissions = submission_service.get_submissions()
    return submissions


@submission_router.get("/{submission_id}")
async def get_submission(submission_id: UUID, session: SessionDep):
    submission_service = SubmissionService(session)
    submission = submission_service.get_submission(submission_id)
    return submission


@submission_router.post("/{submission_id}")
async def update_submission(
    submission_id: UUID,
    submission_update: SubmissionUpdate,
    session: SessionDep,
):
    submission_service = SubmissionService(session)
    submission = submission_service.update_submission(submission_id, submission_update)
    return submission


@submission_router.delete("/{submission_id}")
async def delete_submission(
    submission_id: UUID,
    session: SessionDep,
):
    submission_service = SubmissionService(session)
    return submission_service.delete_submission(submission_id)
