"""Participant routes module."""

from uuid import UUID

from fastapi import APIRouter

from app.db import SessionDep
from app.models.participant import (
    ParticipantCreate,
    ParticipantRead,
)
from app.services.participant_service import ParticipantService

participant_router = APIRouter(prefix="/participation", tags=["Participants"])


@participant_router.get("/hacker/{hacker_id}")
async def get_participation(hacker_id: UUID, session: SessionDep):
    participant_service = ParticipantService(session)
    participants = participant_service.get_participations(hacker_id)
    return participants


@participant_router.post("/", response_model=ParticipantRead)
async def create_participant(participant: ParticipantCreate, session: SessionDep):
    participant_service = ParticipantService(session)
    new_participant = participant_service.create_participant(participant)
    return new_participant


@participant_router.get("/{participant_id}")
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
    return participant_service.delete_participant(
        program_id=program_id, hacker_id=hacker_id
    )
