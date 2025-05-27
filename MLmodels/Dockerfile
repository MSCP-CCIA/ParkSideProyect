# MLmodels/Dockerfile

FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    git \
    curl \
  && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir poetry

ENV POETRY_HTTP_MAX_RETRIES=5 \
    POETRY_HTTP_TIMEOUT=120 \
    PYTHONPATH=/app

WORKDIR /app

# 1) Copia solo pyproject.toml y poetry.lock (para cachear)
COPY MLmodels/pyproject.toml MLmodels/poetry.lock ./

# 2) Instala deps sin virtualenv
RUN poetry config virtualenvs.create false \
 && poetry install --no-root --no-interaction --no-ansi

# 3) Necesitas OpenCV
RUN pip install --no-cache-dir opencv-python-headless

# 4) Copia la aplicación
COPY MLmodels/app ./app

# 6) copia también la carpeta Inference dentro de `app`
COPY MLmodels/Inference ./app/Inference

COPY MLmodels/Utils ./app/Utils

COPY MLmodels/Models ./app/Models

EXPOSE 8001

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]