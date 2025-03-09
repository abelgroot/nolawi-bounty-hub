from uuid import UUID

from fastapi import APIRouter

from app.db import SessionDep
from app.models.bountyprogram import (
    BountyProgramCreate,
    BountyProgramRead,
    BountyProgramUpdate,
)
from app.services.bountyprogram_service import BountyProgramService

bountyprogram_router = APIRouter(prefix="/bountyprograms", tags=["BountyPrograms"])


@bountyprogram_router.post("/", response_model=BountyProgramRead)
async def create_bountyprogram(bountyprogram: BountyProgramCreate, session: SessionDep):
    bountyprogram_service = BountyProgramService(session)
    new_bountyprogram = bountyprogram_service.create_bountyprogram(bountyprogram)
    return new_bountyprogram


@bountyprogram_router.get("/")
async def get_bountyprograms(session: SessionDep):
    bountyprogram_service = BountyProgramService(session)
    bountyprograms = bountyprogram_service.get_bountyprograms()
    return bountyprograms


@bountyprogram_router.get("/{bountyprogram_id}")
async def get_bountyprogram(bountyprogram_id: UUID, session: SessionDep):
    bountyprogram_service = BountyProgramService(session)
    bountyprograms = bountyprogram_service.get_bountyprogram(bountyprogram_id)
    return bountyprograms


@bountyprogram_router.post("/{bountyprogram_id}")
async def update_bountyprogram(
    bountyprogram_id: UUID,
    bountyprogram_update: BountyProgramUpdate,
    session: SessionDep,
):
    bountyprogram_service = BountyProgramService(session)
    bountyprograms = bountyprogram_service.update_bountyprogram(
        bountyprogram_id, bountyprogram_update
    )
    return bountyprograms


@bountyprogram_router.delete("/{bountyprogram_id}")
async def delete_bountyprogram(
    bountyprogram_id: UUID,
    session: SessionDep,
):
    bountyprogram_service = BountyProgramService(session)
    return bountyprogram_service.delete_bountyprogram(bountyprogram_id)
