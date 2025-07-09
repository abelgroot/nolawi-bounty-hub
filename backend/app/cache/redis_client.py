from app.config import Config, get_config
# redis_client.py
import redis.asyncio as redis

# Load config and create engine ONCE
config = get_config()

redis_client = redis.from_url(config.redis_connection_url, decode_responses=True)
