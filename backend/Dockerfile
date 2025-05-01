# backend/Dockerfile

FROM python:3.12-slim

# 1) Instala curl y limpia cachés de apt
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl \
 && rm -rf /var/lib/apt/lists/*

# 2) Instala Poetry vía pip
RUN pip install --no-cache-dir poetry

WORKDIR /app

# 3) Copia pyproject.toml y poetry.lock desde backend/
COPY backend/pyproject.toml backend/poetry.lock ./

# 4) Instala dependencias de producción (sin virtualenv)
RUN poetry config virtualenvs.create false \
 && poetry install --no-root --no-interaction --no-ansi

# 5) Copia únicamente tu paquete `app/` del backend:
#    Host: backend/app → Contenedor: /app/app
COPY backend/app /app/app

# 6) Exponer el puerto de Uvicorn
EXPOSE 8000

# 7) Arranca Uvicorn apuntando al módulo `app.main`
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
