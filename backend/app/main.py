from fastapi import FastAPI

from app.routes.bountyprogram_routes import bountyprogram_router
from app.routes.user_routes import user_router

app = FastAPI()

app.include_router(user_router)
app.include_router(bountyprogram_router)
