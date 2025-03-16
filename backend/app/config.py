from functools import lru_cache

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Config(BaseSettings):
    db_connection_url: str
    signing_secret: str


@lru_cache
def get_config():
    config = Config()  # type: ignore
    return config
