import traceback
from uuid import UUID

from fastapi import APIRouter, HTTPException, Request, status

from app.db import SessionDep
from app.models.bountyprogram import (
    BountyProgramCreate,
    BountyProgramRead,
    BountyProgramUpdate,
)
from app.models.user import UserType
from app.services.bountyprogram_service import BountyProgramService
from app.services.user_service import UserService

bountyprogram_router = APIRouter(prefix="/bountyprograms", tags=["BountyPrograms"])


@bountyprogram_router.post("/", response_model=BountyProgramRead)
async def create_bountyprogram(
    request: Request,
    bountyprogram: BountyProgramCreate,
    session: SessionDep,
):
    try:
        user_service = UserService(session)
        user = user_service.get_current_user(request)
        if user.role != UserType.COMPANY:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only companies can create bounty programs.",
            )

        bountyprogram_service = BountyProgramService(session)
        new_bountyprogram = bountyprogram_service.create_bountyprogram(user=user, bountyprogram_create=bountyprogram)
        return new_bountyprogram
    except Exception:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your are not authorized to access this resource.",
        )

    bountyprogram_service = BountyProgramService(session)
    new_bountyprogram = bountyprogram_service.create_bountyprogram(bountyprogram)
    return new_bountyprogram


@bountyprogram_router.get("/")
async def get_all_bountyprograms(
    request: Request,
    session: SessionDep,
):
    try:
        user_service = UserService(session)
        user = user_service.get_current_user(request)

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Your are not authorized to access this resource.",
            )

        bountyprogram_service = BountyProgramService(session)
        if user.role == UserType.ADMIN:
            return bountyprogram_service.get_all_submitted_bountyprograms()
        else:
            return bountyprogram_service.get_user_bountyprograms(user_id=user.id)

    except Exception:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your are not authorized to access this resource.",
        )


@bountyprogram_router.get("/{bountyprogram_id}")
async def get_bountyprogram(bountyprogram_id: UUID, session: SessionDep):
    bountyprogram_service = BountyProgramService(session)
    bountyprogram = bountyprogram_service.get_bountyprogram(bountyprogram_id)
    return bountyprogram


@bountyprogram_router.post("/{bountyprogram_id}")
async def update_bountyprogram(
    bountyprogram_id: UUID,
    bountyprogram_update: BountyProgramUpdate,
    session: SessionDep,
):
    bountyprogram_service = BountyProgramService(session)
    bountyprograms = bountyprogram_service.update_bountyprogram(bountyprogram_id, bountyprogram_update)
    return bountyprograms


@bountyprogram_router.delete("/{bountyprogram_id}")
async def delete_bountyprogram(
    bountyprogram_id: UUID,
    session: SessionDep,
):
    bountyprogram_service = BountyProgramService(session)
    return bountyprogram_service.delete_bountyprogram(bountyprogram_id)
