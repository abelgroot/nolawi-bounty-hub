import traceback
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlmodel import select

from app.models.bountyprogram import (
    BountyProgram,
    BountyProgramCreate,
    BountyProgramRead,
    BountyProgramUpdate,
)
from app.models.user import User, UserType


class BountyProgramService:
    def __init__(self, session: Session):
        self.session = session

    def create_bountyprogram(
        self, bountyprogram_create: BountyProgramCreate
    ) -> BountyProgramRead:
        program_query = select(BountyProgram).where(
            BountyProgram.owner_id == bountyprogram_create.owner_id,
            BountyProgram.name == bountyprogram_create.name,
        )
        program_result = self.session.execute(program_query)
        program = program_result.scalar_one_or_none()

        if program:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Bounty program already exists",
            )

        # Validate owner_id exists and is of type 'company'
        user_query = select(User).where(User.id == bountyprogram_create.owner_id)
        result = self.session.execute(user_query)
        owner = result.scalar_one_or_none()

        if not owner:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid owner_id: User does not exist",
            )

        if owner.role != UserType.COMPANY:  # Correct Enum Comparison
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid owner_id: User is not a company",
            )

        # Create bounty program
        bountyprogram = BountyProgram(
            name=bountyprogram_create.name,
            description=bountyprogram_create.description,
            reward_amount=bountyprogram_create.reward_amount,
            owner_id=bountyprogram_create.owner_id,
        )

        self.session.add(bountyprogram)
        self.session.commit()
        self.session.refresh(bountyprogram)
        self.session.close()
        return BountyProgramRead.from_orm(bountyprogram)

    def get_bountyprograms(self) -> list[BountyProgram]:
        return self.session.query(BountyProgram).all()

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
