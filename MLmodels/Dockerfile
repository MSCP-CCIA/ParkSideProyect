FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1 \
    git \
    curl \
&& rm -rf /var/lib/apt/lists/*

# 2) Instala Poetry vía pip
RUN pip install --no-cache-dir poetry

WORKDIR /MLmodels

COPY . ./

# 3) Copia pyproject.toml y poetry.lock desde backend/
COPY MLmodels/pyproject.toml MLmodels/poetry.lock ./

RUN poetry config virtualenvs.create false \
 && poetry install --no-root --no-interaction --no-ansi

EXPOSE 8001

CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]