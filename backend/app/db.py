from typing import Annotated

from fastapi import Depends
from sqlalchemy import create_engine
from sqlmodel import Session

from app.config import Config, get_config


def get_engine(config: Config):
    return create_engine(
        url=config.db_connection_url,
        echo=False,
        pool_pre_ping=True,
        pool_size=50,
        max_overflow=10,
    )


def get_session():
    engine = get_engine(config=get_config())
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
