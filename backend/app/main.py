from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.bountyprogram_routes import bountyprogram_router
from app.routes.participant_routes import participant_router
from app.routes.payment_routes import payment_router
from app.routes.submission_routes import submission_router
from app.routes.user_routes import auth_router, user_router

app = FastAPI()

subapp = FastAPI()
subapp.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:3000", "http://127.0.0.1", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.mount("/api/v1/", subapp)

subapp.include_router(auth_router)
subapp.include_router(user_router)
subapp.include_router(bountyprogram_router)
subapp.include_router(participant_router)
subapp.include_router(submission_router)
subapp.include_router(payment_router)
