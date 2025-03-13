from uuid import UUID

from fastapi import APIRouter

from app.db import SessionDep
from app.models.participant import (
    ParticipantCreate,
    ParticipantRead,
)
from app.services.participant_service import ParticipantService

participant_router = APIRouter(prefix="/participants", tags=["Participants"])


@participant_router.post("/", response_model=ParticipantRead)
async def create_participant(participant: ParticipantCreate, session: SessionDep):
    participant_service = ParticipantService(session)
    new_participant = participant_service.create_participant(participant)
    return new_participant


@participant_router.get("/")
async def get_participants(session: SessionDep):
    participant_service = ParticipantService(session)
    participants = participant_service.get_paricipants()
    return participants


@participant_router.get("/{participant_id}")
async def get_participant(participant_id: UUID, session: SessionDep):
    participant_service = ParticipantService(session)
    participant = participant_service.get_participant(participant_id)
    return participant


@participant_router.delete("/{participant_id}")
async def delete_participant(
    participant_id: UUID,
    session: SessionDep,
):
    participant_service = ParticipantService(session)
    return participant_service.delete_participant(participant_id)
