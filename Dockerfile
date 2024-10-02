# ============================
# Stage 1: Frontend Build
# ============================
FROM node:16 AS frontend

# Set working directory
WORKDIR /app

# Copy everything into the container
COPY . .

# Move into frontend directory
WORKDIR /app/frontend

# Install npm dependencies
RUN npm install

# Build the React app for production
RUN npm run build


# ============================
# Stage 2: Backend Build
# ============================
FROM python:3.10-slim AS backend

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev gcc

# Copy everything into the backend stage
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the frontend build from the frontend stage to the backend static files
COPY --from=frontend /app/frontend/build /app/frontend/build

RUN python manage.py makemigrations
RUN python manage.py migrate

# Expose the Django port
EXPOSE 8000

# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
