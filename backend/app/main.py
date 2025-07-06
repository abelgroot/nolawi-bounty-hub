from fastapi import FastAPI
from a2wsgi import ASGIMiddleware
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
    allow_origins=["*"],
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

# Wrap FastAPI ASGI app as WSGI
wsgi_app = ASGIMiddleware(app)
