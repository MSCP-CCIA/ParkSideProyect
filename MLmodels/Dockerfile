# Usa Python base
FROM python:3.11-slim

# Instala dependencias del sistema necesarias para OpenCV y otras
RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    git \
    curl \
 && rm -rf /var/lib/apt/lists/*

# Instala Poetry
RUN pip install --no-cache-dir poetry

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia TODA la carpeta MLmodels (nivel superior)
COPY MLmodels ./MLmodels

# Establece PYTHONPATH para que Python reconozca la ruta MLmodels/
ENV PYTHONPATH=/app

# Instala dependencias desde pyproject.toml
WORKDIR /app/MLmodels
RUN poetry config virtualenvs.create false \
 && poetry install --no-root --no-interaction --no-ansi

# Asegura que OpenCV esté presente
RUN pip install --no-cache-dir opencv-python-headless

RUN pip install --no-cache-dir python-multipart

# Exponer puerto
EXPOSE 8001

# Comando para ejecutar FastAPI
CMD ["uvicorn", "MLmodels.app.main:app", "--host", "0.0.0.0", "--port", "8001"]
