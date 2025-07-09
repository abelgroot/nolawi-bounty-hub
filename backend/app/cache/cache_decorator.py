import functools
import json
import logging
from typing import Callable, Optional
import enum

from app.cache.redis_client import redis_client
import uuid
from datetime import datetime

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())

class EnhancedJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, uuid.UUID):
            return str(obj)
        if isinstance(obj, datetime):
            return obj.isoformat()
        if isinstance(obj, enum.Enum):
            return obj.value
        return super().default(obj)


def redis_cache(
    key_builder: Optional[Callable] = None,
    ttl: int = 60,
    model_class: Optional[type] = None,
):
    def decorator(func: Callable):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            cache_key = key_builder(*args, **kwargs) if key_builder else f"{func.__name__}:{args}:{kwargs}"

            cached = await redis_client.get(cache_key)
            if cached:
                logger.info(f"Cache hit for {cache_key}")
                data = json.loads(cached)
                if model_class:
                    if isinstance(data, list):
                        return [model_class.parse_obj(item) for item in data]
                    return model_class.parse_obj(data)
                return data

            logger.info(f"Cache miss for {cache_key}")
            result = await func(*args, **kwargs)

            if model_class:
                if isinstance(result, list):
                    data = [item.dict() if hasattr(item, "dict") else item for item in result]
                elif hasattr(result, "dict"):
                    data = result.dict()
                else:
                    data = result
            else:
                data = result

            await redis_client.setex(cache_key, ttl, json.dumps(data, cls=EnhancedJSONEncoder))
            return result

        return wrapper

    return decorator
