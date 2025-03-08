import traceback
from uuid import UUID

import bcrypt
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlmodel import select

from app.models.user import User, UserCreate, UserRead, UserUpdate


class UserService:
    def __init__(self, session: Session):
        self.session = session

    def create_user(self, user_create: UserCreate) -> UserRead:
        try:
            hashed_password = bcrypt.hashpw(
                user_create.password.encode("utf-8"), bcrypt.gensalt()
            )
            user = User(
                email=user_create.email,
                password=hashed_password.decode(),
                role=user_create.role,
            )
            self.session.add(user)
            self.session.commit()
            self.session.refresh(user)
            self.session.close()
            return UserRead.from_orm(user)
        except Exception:
            print(traceback.format_exc())
            self.session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="unable to create user",
            )

    def get_users(self) -> list[User]:
        return self.session.query(User).all()

    def get_user(self, user_id: UUID) -> User:
        query = select(User).where(User.id == user_id)
        result = self.session.execute(query)
        user = result.scalar_one_or_none()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="user not found",
            )
        return user

    def update_user(self, user_id: UUID, user_update: UserUpdate) -> UserRead:
        query = select(User).where(User.id == user_id)
        result = self.session.execute(query)
        user = result.scalar_one_or_none()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="user not found",
            )

        if user_update.email:
            user.email = user_update.email
        if user_update.password:
            hashed_password = bcrypt.hashpw(
                user_update.password.encode("utf-8"), bcrypt.gensalt()
            )
            user.password = hashed_password.decode()

        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)
        self.session.close()
        return UserRead.from_orm(user)

    def delete_user(self, user_id: UUID):
        query = select(User).where(User.id == user_id)
        result = self.session.execute(query)
        user = result.scalar_one_or_none()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="user not found",
            )

        self.session.delete(user)
        self.session.commit()
        self.session.close()
        return HTTPException(
            status_code=status.HTTP_204_NO_CONTENT,
            detail="user deleted successfully",
        )


def verify_password(password: str, hashed_password: str) -> bool:
    entered_password = "my_secure_password".encode("utf-8")
    return bcrypt.checkpw(entered_password, hashed_password.encode("utf-8"))
