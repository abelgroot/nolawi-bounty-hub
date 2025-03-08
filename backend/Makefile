makemigrations:
	@read -p "Enter migration message: " message; \
	uv run alembic revision --autogenerate -m "$$message"

migrate-db:
	uv run alembic upgrade head

revert-migration:
	uv run alembic downgrade -1

dev:
	uv run fastapi dev
