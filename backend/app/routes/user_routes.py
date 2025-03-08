from uuid import UUID

from fastapi import APIRouter

from app.db import SessionDep
from app.models.user import UserCreate, UserRead, UserUpdate
from app.services.user_service import UserService

user_router = APIRouter(prefix="/users", tags=["Users"])


@user_router.post("/", response_model=UserRead)
async def create_user(user: UserCreate, session: SessionDep):
    user_service = UserService(session)
    new_user = user_service.create_user(user)
    return new_user


@user_router.get("/")
async def get_users(session: SessionDep):
    user_service = UserService(session)
    users = user_service.get_users()
    return users


@user_router.get("/{user_id}")
async def get_user(user_id: UUID, session: SessionDep):
    user_service = UserService(session)
    users = user_service.get_user(user_id)
    return users


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
