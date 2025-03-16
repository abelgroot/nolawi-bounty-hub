import traceback
from datetime import datetime, timedelta, timezone
from typing import Tuple
from uuid import UUID

import bcrypt
import jwt
from fastapi import HTTPException, Request, status
from jwt.exceptions import InvalidTokenError
from sqlalchemy.orm import Session
from sqlmodel import select

from app.config import get_config
from app.models.user import Token, User, UserCreate, UserRead, UserUpdate


class UserService:
    def __init__(self, session: Session):
        self.session = session
        self.config = get_config()

    def create_user(self, user_create: UserCreate) -> UserRead:
        try:
            hashed_password = bcrypt.hashpw(user_create.password.encode("utf-8"), bcrypt.gensalt())
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

    def get_companies(self) -> list[User]:
        return self.session.query(User).where(User.role == "company").all()

    def get_current_user(self, request: Request):
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            authorization_header = request.headers.get("Authorization")
            print(f"Authorization header: {authorization_header}")
            if not authorization_header or "Bearer" not in authorization_header:
                raise credentials_exception
            token = authorization_header.split("Bearer ")[1]
            payload = jwt.decode(token, self.config.signing_secret, algorithms=["HS256"])
            user_id: str = payload.get("sub")
            if user_id is None:
                raise credentials_exception
            user = self.get_user(request, UUID(user_id))
            if user is None:
                raise credentials_exception
            return user
        except InvalidTokenError:
            raise credentials_exception

    def get_user(self, request: Request, user_id: UUID) -> User:
        query = select(User).where(User.id == user_id)
        result = self.session.execute(query)
        user = result.scalar_one_or_none()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="user not found",
            )
        return user

    def get_by_email(self, email: str) -> User:
        query = select(User).where(User.email == email)
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
            hashed_password = bcrypt.hashpw(user_update.password.encode("utf-8"), bcrypt.gensalt())
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

    def authenticate_user(self, email: str, password: str) -> Tuple[Token, User]:
        user = self.get_by_email(email)

        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

        if not user:
            raise credentials_exception
        if not verify_password(password, user.password):
            raise credentials_exception

        try:
            access_token = create_access_token(
                signing_secret=self.config.signing_secret,
                data={"sub": str(user.id)},
            )
            token = Token(access_token=access_token, token_type="bearer")
            return token, user
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Unable to authenticate user",
            )


def verify_password(password: str, hashed_password: str) -> bool:
    entered_password = password.encode("utf-8")
    return bcrypt.checkpw(entered_password, hashed_password.encode("utf-8"))


def create_access_token(
    signing_secret: str,
    data: dict,
    expires_delta: timedelta | None = None,
    algorithm="HS256",
):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=60 * 24 * 7)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, signing_secret, algorithm=algorithm)
    return encoded_jwt
