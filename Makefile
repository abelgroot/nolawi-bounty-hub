# Variables
BACKEND_DIR = backend
FRONTEND_DIR = frontend

# Default target (run when you type `make` without arguments)
all: start-db start-backend start-frontend

# Stop all running services (Docker, FastAPI, npm)
stop-all:
	@echo "Stopping all running services..."
	-docker compose down
	-pkill -f "uv run fastapi dev"
	-pkill -f "npm run stop"

# Start the database using Docker Compose
start-db:
	@echo "Stopping all running databases..."
	-docker compose down
	@echo "Starting the database..."
	docker compose up -d db
	@echo "Waiting for the database to initialize..."
	sleep 5  # Adjust sleep time as needed

# Start the FastAPI backend
start-backend:
	@echo "Stopping all running FastAPI backends..."
	-pkill -f "uv run fastapi dev"
	@echo "Starting the FastAPI backend..."
	cd $(BACKEND_DIR) && uv run fastapi dev

# Start the frontend development server
start-frontend:
	@echo "Stopping all running FastAPI backends..."
	-pkill -f "uv run fastapi dev"
	@echo "Starting the frontend..."
	cd $(FRONTEND_DIR) && npm run dev

# Start Docker logs
start-docker-logs:
	@echo "Starting Docker logs..."
	docker compose logs -f

# Stop the database
stop-db:
	@echo "Stopping the database..."
	docker compose down

# Clean up (stop database and remove containers)
clean: stop-db
	@echo "Cleaning up..."
	docker compose rm -f

# Help message
help:
	@echo "Available targets:"
	@echo "  all             - Stop all services, then start the database, backend, frontend, and Docker logs in parallel"
	@echo "  stop-all        - Stop all running services (Docker, FastAPI, npm)"
	@echo "  start-db        - Start the database using Docker Compose"
	@echo "  start-backend   - Start the FastAPI backend"
	@echo "  start-frontend  - Start the frontend development server"
	@echo "  start-docker-logs - Start Docker logs"
	@echo "  stop-db         - Stop the database"
	@echo "  clean           - Stop the database and remove containers"
	@echo "  help            - Show this help message"
