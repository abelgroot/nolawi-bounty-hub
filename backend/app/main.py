from fastapi import FastAPI

from app.routes.bountyprogram_routes import bountyprogram_router
from app.routes.participant_routes import participant_router
from app.routes.payment_routes import payment_router
from app.routes.submission_routes import submission_router
from app.routes.user_routes import user_router

app = FastAPI()

app.include_router(user_router)
app.include_router(bountyprogram_router)
app.include_router(participant_router)
app.include_router(submission_router)
app.include_router(payment_router)
