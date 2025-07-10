import traceback
from uuid import UUID

from fastapi import APIRouter, HTTPException, Request, status

from app.cache.cache_decorator import redis_cache
from app.cache.redis_client import redis_client
from app.db import SessionDep
from app.models.bountyprogram import (
    BountyProgramCreate,
    BountyProgramRead,
    BountyProgramUpdate,
)
from app.models.user import UserType
from app.services.bountyprogram_service import BountyProgramService
from app.services.user_service import UserService

bountyprogram_router = APIRouter(prefix="/bountyprograms", tags=["BountyPrograms"])


def bountyprograms_key_builder(request: Request, session: SessionDep):
    user_service = UserService(session)
    user = user_service.get_current_user(request)

    if not user:
        return "bountyprograms:public:list"

    if user.role == UserType.ADMIN:
        return "bountyprograms:admin:list"
    elif user.role == UserType.COMPANY:
        return f"bountyprograms:company:{user.id}:list"

    return f"bountyprograms:user:{user.id}:list"


def bountyprogram_key_builder(bountyprogram_id: UUID, session: SessionDep):
    return f"bountyprogram:{str(bountyprogram_id)}"


async def invalidate_bountyprogram_caches(owner_id: str | UUID):
    await redis_client.delete(f"bountyprograms:company:{owner_id}:list")
    await redis_client.delete("bountyprograms:admin:list")
    await redis_client.delete(f"bountyprograms:user:{owner_id}:list")


@bountyprogram_router.post("/", response_model=BountyProgramRead)
async def create_bountyprogram(
    request: Request,
    bountyprogram: BountyProgramCreate,
    session: SessionDep,
):
    try:
        user_service = UserService(session)
        user = user_service.get_current_user(request)
        if user.role != UserType.COMPANY:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only companies can create bounty programs.",
            )
        user_id = user.id
        bountyprogram_service = BountyProgramService(session)
        new_bountyprogram = bountyprogram_service.create_bountyprogram(
            user_id=user_id, bountyprogram_create=bountyprogram
        )
        await invalidate_bountyprogram_caches(user_id)
        return new_bountyprogram
    except Exception:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your are not authorized to access this resource.",
        )


@bountyprogram_router.get("/")
@redis_cache(
    key_builder=bountyprograms_key_builder, ttl=60, model_class=BountyProgramRead
)
async def get_all_bountyprograms(
    request: Request,
    session: SessionDep,
):
    try:
        user_service = UserService(session)
        user = user_service.get_current_user(request)

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Your are not authorized to access this resource.",
            )

        bountyprogram_service = BountyProgramService(session)
        if user.role == UserType.ADMIN:
            return bountyprogram_service.get_all_submitted_bountyprograms()
        elif user.role == UserType.COMPANY:
            return bountyprogram_service.get_user_bountyprograms(user_id=user.id)
        else:
            return bountyprogram_service.get_user_bountyprograms()

    except Exception:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your are not authorized to access this resource.",
        )


@bountyprogram_router.get("/{bountyprogram_id}")
@redis_cache(
    key_builder=bountyprogram_key_builder, ttl=120, model_class=BountyProgramRead
)
async def get_bountyprogram(bountyprogram_id: UUID, session: SessionDep):
    bountyprogram_service = BountyProgramService(session)
    bountyprogram = bountyprogram_service.get_bountyprogram(bountyprogram_id)
    return bountyprogram


@bountyprogram_router.post("/{bountyprogram_id}")
async def update_bountyprogram(
    bountyprogram_id: UUID,
    bountyprogram_update: BountyProgramUpdate,
    session: SessionDep,
):
    bountyprogram_service = BountyProgramService(session)

    program = bountyprogram_service.get_bountyprogram(bountyprogram_id)
    await invalidate_bountyprogram_caches(program.owner_id)

    bountyprograms = bountyprogram_service.update_bountyprogram(
        bountyprogram_id, bountyprogram_update
    )
    return bountyprograms


@bountyprogram_router.delete("/{bountyprogram_id}")
async def delete_bountyprogram(
    bountyprogram_id: UUID,
    session: SessionDep,
):
    bountyprogram_service = BountyProgramService(session)

    program = bountyprogram_service.get_bountyprogram(bountyprogram_id)
    await invalidate_bountyprogram_caches(program.owner_id)

    return bountyprogram_service.delete_bountyprogram(bountyprogram_id)
