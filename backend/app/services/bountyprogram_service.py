import logging
import traceback
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import desc
from sqlalchemy.orm import Session
from sqlmodel import select

from app.models.bountyprogram import (
    BountyProgram,
    BountyProgramCreate,
    BountyProgramRead,
    BountyProgramUpdate,
    ProgramStatus,
)
from app.models.participant import Participant
from app.models.submission import Submission

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())


class BountyProgramService:
    def __init__(self, session: Session):
        self.session = session

    def create_bountyprogram(
        self, user_id: UUID, bountyprogram_create: BountyProgramCreate
    ) -> BountyProgramRead:
        program_query = select(BountyProgram).where(
            BountyProgram.owner_id == user_id,
            BountyProgram.name == bountyprogram_create.name,
        )
        program_result = self.session.execute(program_query)
        program = program_result.scalar_one_or_none()

        logger.debug(f"Found program : {program}")
        if program:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Bounty program already exists",
            )
        bountyprogram = BountyProgram(
            name=bountyprogram_create.name,
            description=bountyprogram_create.description,
            reward_amount=bountyprogram_create.reward_amount,
            owner_id=user_id,
            status=ProgramStatus.OPEN,
        )

        self.session.add(bountyprogram)
        self.session.commit()
        self.session.refresh(bountyprogram)
        self.session.close()
        return BountyProgramRead.from_orm(bountyprogram)

    def get_all_submitted_bountyprograms(self) -> list[BountyProgram]:
        submissions = self.session.query(Submission).all()
        submitted_program_ids = [submission.program_id for submission in submissions]
        programs = (
            self.session.query(BountyProgram)
            .where(BountyProgram.id.in_(submitted_program_ids))
            .order_by(desc(BountyProgram.updated_at))
            .all()
        )
        return programs

    def get_user_bountyprograms(
        self,
        user_id: UUID | None = None,
    ) -> list[BountyProgram]:
        if user_id:
            return (
                self.session.query(BountyProgram)
                .where(BountyProgram.owner_id == user_id)
                .order_by(desc(BountyProgram.updated_at))
                .all()
            )
        else:
            return self.session.query(BountyProgram).all()

    def get_bountyprograms(self, company_id: UUID) -> list[BountyProgram]:
        return (
            self.session.query(BountyProgram)
            .where(BountyProgram.owner_id == company_id)
            .order_by(desc(BountyProgram.updated_at))
            .all()
        )

    def get_hacker_joined_programs(self, hacker_id: UUID) -> list[BountyProgram]:
        hacker_participations = (
            self.session.query(Participant)
            .where(Participant.hacker_id == hacker_id)
            .all()
        )
        program_ids = [
            participation.program_id for participation in hacker_participations
        ]
        return (
            self.session.query(BountyProgram)
            .where(BountyProgram.id.in_(program_ids))
            .order_by(desc(BountyProgram.updated_at))
            .all()
        )

    def get_bountyprogram(self, bountyprogram_id: UUID) -> BountyProgram:
        query = select(BountyProgram).where(BountyProgram.id == bountyprogram_id)
        result = self.session.execute(query)
        bountyprogram = result.scalar_one_or_none()

        if not bountyprogram:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Program not found",
            )
        return bountyprogram

    def update_bountyprogram(
        self, bountyprogram_id: UUID, bountyprogram_update: BountyProgramUpdate
    ) -> BountyProgramRead:
        query = select(BountyProgram).where(BountyProgram.id == bountyprogram_id)
        result = self.session.execute(query)
        bountyprogram = result.scalar_one_or_none()

        if not bountyprogram:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Program not found",
            )

        if bountyprogram_update.name:
            bountyprogram.name = bountyprogram_update.name
        if bountyprogram_update.description:
            bountyprogram.description = bountyprogram_update.description
        if bountyprogram_update.status:
            bountyprogram.status = bountyprogram_update.status

        self.session.add(bountyprogram)
        self.session.commit()
        self.session.refresh(bountyprogram)

        return BountyProgramRead.from_orm(bountyprogram)

    def delete_bountyprogram(self, bountyprogram_id: UUID):
        try:
            query = select(BountyProgram).where(BountyProgram.id == bountyprogram_id)
            result = self.session.execute(query)
            bountyprogram = result.scalar_one_or_none()

            if not bountyprogram:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Program not found",
                )

            self.session.delete(bountyprogram)
            self.session.commit()
            return {"detail": "Program deleted successfully"}

        except Exception:
            print(traceback.format_exc())
            self.session.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete bounty program",
            )
