import traceback
from uuid import UUID

from fastapi import APIRouter, HTTPException, Request, status

from app.db import SessionDep
from app.models.bountyprogram import (
    BountyProgramCreate,
    BountyProgramRead,
    BountyProgramUpdate,
)
from app.services.bountyprogram_service import BountyProgramService
from app.services.user_service import UserService

bountyprogram_router = APIRouter(prefix="/bountyprograms", tags=["BountyPrograms"])


@bountyprogram_router.post("/", response_model=BountyProgramRead)
async def create_bountyprogram(bountyprogram: BountyProgramCreate, session: SessionDep):
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
        user_service.get_current_user(request)
        bountyprogram_service = BountyProgramService(session)
        bountyprograms = bountyprogram_service.get_all_bountyprograms()
        return bountyprograms
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
