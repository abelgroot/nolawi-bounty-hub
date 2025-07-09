"""a submissions router for fastapi"""

import traceback
from uuid import UUID

from fastapi import APIRouter, HTTPException, Request, status

from app.db import SessionDep
from app.models.submission import (
    SubmissionCreate,
    SubmissionRead,
    SubmissionUpdate,
    SubmissionUpdateFeedback,
    Submission
)
from app.models.user import UserType
from app.services.participant_service import ParticipantService
from app.services.submission_service import SubmissionService
from app.services.user_service import UserService
from app.cache.redis_client import redis_client
from app.cache.cache_decorator import redis_cache

submission_router = APIRouter(prefix="/submissions", tags=["Submissions"])

def submissions_key_builder(request: Request, session: SessionDep):
    user_service = UserService(session)
    user = user_service.get_current_user(request)

    if not user:
        return "submissions:public:list"

    if user.role == UserType.ADMIN:
        return "submissions:admin:list"
    elif user.role == UserType.HACKER:
        return f"submissions:hacker:{user.id}:list"

    return f"submissions:user:{user.id}:list"


def submission_key_builder(submission_id: UUID, session: SessionDep):
    return f"submission:{str(submission_id)}"


async def invalidate_submission_caches(hacker_id: UUID | str):
    await redis_client.delete(f"submissions:hacker:{hacker_id}:list")
    await redis_client.delete("submissions:admin:list")


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
    await invalidate_submission_caches(submission.hacker_id)
    return new_submission


@submission_router.get("/")
@redis_cache(key_builder=submissions_key_builder, ttl=60, model_class=Submission)
async def get_submissions(request: Request, session: SessionDep):
    try:
        user_service = UserService(session)
        user = user_service.get_current_user(request)

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Your are not authorized to access this resource.",
            )

        submission_service = SubmissionService(session)
        if user.role == UserType.ADMIN:
            return submission_service.get_all_sumissions()
        elif user.role == UserType.HACKER:
            return submission_service.get_submissions_by_user(hacker_id=user.id)
        else:
            return list()

    except Exception:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your are not authorized to access this resource.",
        )


@submission_router.post("/{submission_id}")
async def update_submission(
    submission_id: UUID,
    submission_update: SubmissionUpdate,
    session: SessionDep,
):
    submission_service = SubmissionService(session)
    submission = submission_service.update_submission(submission_id, submission_update)
    await invalidate_submission_caches(submission.hacker_id)
    return submission


@submission_router.post("/feedback/{submission_id}")
async def update_submission_feedback(
    request: Request,
    submission_id: UUID,
    submission_update_feedback: SubmissionUpdateFeedback,
    session: SessionDep,
):
    try:
        user_service = UserService(session)
        user = user_service.get_current_user(request)

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Your are not authorized to perform this action.",
            )

        submission_service = SubmissionService(session)
        submission = submission_service.update_submissionFeedback(
            submission_id=submission_id,
            updater=user,
            submission_updatefeedback=submission_update_feedback,
        )
        await invalidate_submission_caches(submission.hacker_id)
        return submission

    except Exception:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your are not authorized to access this resource.",
        )
