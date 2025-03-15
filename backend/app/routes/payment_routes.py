from uuid import UUID

from fastapi import APIRouter

from app.db import SessionDep
from app.models.payment import PaymentCreate, PaymentRead, PaymentUpdate
from app.services.payment_service import PaymentService

payment_router = APIRouter(prefix="/payments", tags=["Payments"])


@payment_router.post("/", response_model=PaymentRead)
async def create_payment(payment: PaymentCreate, session: SessionDep):
    payment_service = PaymentService(session)
    new_payment = payment_service.create_payment(payment)
    return new_payment


@payment_router.get("/")
async def get_payments(session: SessionDep):
    payment_service = PaymentService(session)
    payments = payment_service.get_payments()
    return payments


@payment_router.get("/{payment_id}")
async def get_payment(payment_id: UUID, session: SessionDep):
    payment_service = PaymentService(session)
    payment = payment_service.get_payment(payment_id)
    return payment


@payment_router.post("/{payment_id}")
async def update_payment(
    payment_id: UUID,
    payment_update: PaymentUpdate,
    session: SessionDep,
):
    payment_service = PaymentService(session)
    payment = payment_service.update_payment(payment_id, payment_update)
    return payment
