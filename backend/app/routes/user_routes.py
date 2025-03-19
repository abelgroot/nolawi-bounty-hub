from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from app.db import SessionDep
from app.models.user import AuthUser, UserCreate, UserRead, UserType, UserUpdate
from app.services.user_service import UserService

user_router = APIRouter(prefix="/users", tags=["Users"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")
auth_router = APIRouter(prefix="/auth", tags=["Authentication"])


@auth_router.post("/login", response_model=AuthUser)
def login_user(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: SessionDep,
):
    try:
        user_service = UserService(session)
        email = form_data.username
        password = form_data.password
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid request")

    token, user = user_service.authenticate_user(email, password)
    return AuthUser(user=UserRead.model_validate(user), token=token)


@user_router.post("/", response_model=UserRead)
async def create_user(user: UserCreate, session: SessionDep):
    user_service = UserService(session)
    new_user = user_service.create_user(user)
    return new_user


@user_router.get("/")
async def get_users(request: Request, session: SessionDep):
    try:
        user_service = UserService(session)
        user = user_service.get_current_user(request)

        if user is None or user.role != UserType.ADMIN:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Your are not authorized to access this resource.",
            )

        user_service = UserService(session)
        users = user_service.get_users()
        return users

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your are not authorized to access this resource.",
        )


@user_router.get("/companies")
async def get_companies(session: SessionDep):
    user_service = UserService(session)
    users = user_service.get_companies()
    return users


@user_router.get("/{user_id}")
async def get_user(request: Request, user_id: str, session: SessionDep):
    user_service = UserService(session)
    if user_id == "me":
        user = user_service.get_current_user(request)
    else:
        user = user_service.get_user(request=request, user_id=UUID(user_id))
    return user


@user_router.post("/{user_id}")
async def update_user(
    user_id: UUID,
    user_update: UserUpdate,
    session: SessionDep,
):
    user_service = UserService(session)
    users = user_service.update_user(user_id, user_update)
    return users


@user_router.delete("/{user_id}")
async def delete_user(
    user_id: UUID,
    session: SessionDep,
):
    user_service = UserService(session)
    return user_service.delete_user(user_id)
