"""Participant routes module."""

from uuid import UUID

from fastapi import APIRouter

from app.db import SessionDep
from app.models.participant import (
    ParticipantCreate,
    ParticipantRead,
    Participant,
)
from app.services.participant_service import ParticipantService
from app.cache.redis_client import redis_client
from app.cache.cache_decorator import redis_cache
from app.models.participant import ParticipantRead
from app.models.bountyprogram import BountyProgram

participant_router = APIRouter(prefix="/participation", tags=["Participants"])

def hacker_participation_key_builder(hacker_id: UUID, session: SessionDep):
    return f"participations:hacker:{str(hacker_id)}"


def participant_key_builder(participant_id: UUID, session: SessionDep):
    return f"participant:{str(participant_id)}"


async def invalidate_participant_caches(hacker_id: UUID):
    await redis_client.delete(f"participations:hacker:{str(hacker_id)}")


@participant_router.get("/hacker/{hacker_id}")
@redis_cache(key_builder=hacker_participation_key_builder, ttl=60, model_class=BountyProgram)
async def get_participation(hacker_id: UUID, session: SessionDep):
    participant_service = ParticipantService(session)
    participants = participant_service.get_participations(hacker_id)
    return participants


@participant_router.post("/", response_model=ParticipantRead)
async def create_participant(participant: ParticipantCreate, session: SessionDep):
    participant_service = ParticipantService(session)
    new_participant = participant_service.create_participant(participant)
    await invalidate_participant_caches(participant.hacker_id)
    return new_participant


@participant_router.get("/{participant_id}")
@redis_cache(key_builder=participant_key_builder, ttl=60, model_class=Participant)
async def get_participant(participant_id: UUID, session: SessionDep):
    participant_service = ParticipantService(session)
    participant = participant_service.get_participant(participant_id)
    return participant


@participant_router.delete("/{program_id}/{hacker_id}")
async def delete_participant(
    program_id: UUID,
    hacker_id: UUID,
    session: SessionDep,
):
    participant_service = ParticipantService(session)
    await invalidate_participant_caches(hacker_id)

    return participant_service.delete_participant(
        program_id=program_id, hacker_id=hacker_id
    )
