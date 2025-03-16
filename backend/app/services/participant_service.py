import traceback
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlmodel import select

from app.models.bountyprogram import BountyProgram, ProgramStatus
from app.models.participant import Participant, ParticipantCreate, ParticipantRead


class ParticipantService:
    def __init__(self, session: Session):
        self.session = session

    def create_participant(self, participant_create: ParticipantCreate) -> ParticipantRead:
        # Check if the hacker is already participating in the program
        existing_participant_query = select(Participant).where(
            Participant.hacker_id == participant_create.hacker_id,
            Participant.program_id == participant_create.program_id,
        )
        existing_participant = self.session.execute(existing_participant_query).scalar_one_or_none()

        if existing_participant:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Hacker is already participating in this program",
            )
        user_query = select(BountyProgram).where(BountyProgram.id == participant_create.program_id)
        result = self.session.execute(user_query)
        program = result.scalar_one_or_none()

        if not program:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid program_id: Program does not exist",
            )

        if program.status == ProgramStatus.CLOSED:  # Correct Enum Comparison
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Program: Program is closed",
            )

        # Join the program as a participant
        participant = Participant(
            hacker_id=participant_create.hacker_id,
            program_id=participant_create.program_id,
        )

        self.session.add(participant)
        self.session.commit()
        self.session.refresh(participant)
        self.session.close()
        return ParticipantRead.from_orm(participant)

    def get_participation(self, hacker_id: UUID) -> list[BountyProgram]:
        participation = self.session.query(Participant).where(Participant.hacker_id == hacker_id).all()
        program_ids = [p.program_id for p in participation]
        programs = self.session.query(BountyProgram).where(BountyProgram.id.in_(program_ids)).all()
        return programs

    def get_participant(self, participant_id: UUID) -> Participant:
        query = select(Participant).where(Participant.id == participant_id)
        result = self.session.execute(query)
        participant = result.scalar_one_or_none()

        if not participant:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="participant not found",
            )
        return participant

    def delete_participant(self, participant_id: UUID):
        try:
            query = select(Participant).where(Participant.id == participant_id)
            result = self.session.execute(query)
            participant = result.scalar_one_or_none()

            if not participant:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="participant not found",
                )

            self.session.delete(participant)
            self.session.commit()
            return {"detail": "participant deleted successfully"}

        except Exception:
            print(traceback.format_exc())
            self.session.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete particpant",
            )
