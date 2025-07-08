from typing import Annotated
from fastapi import Depends
from sqlalchemy import create_engine
from sqlmodel import Session

from app.config import Config, get_config

# Load config and create engine ONCE
config = get_config()
engine = create_engine(
    url=config.db_connection_url,
    echo=False,
    pool_pre_ping=True,
    pool_size=5,        # Be careful with Supabase limits
    max_overflow=2,     # You can tune this as needed
)

# Dependency function that yields a session from the global engine
def get_session():
    with Session(engine) as session:
        yield session

# FastAPI dependency annotation
SessionDep = Annotated[Session, Depends(get_session)]
