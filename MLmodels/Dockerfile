FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1 \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

ENV POETRY_VERSION=1.8.2
RUN curl -sSL https://install.python-poetry.org | python3 - \
    && ln -s /root/.local/bin/poetry /usr/local/bin/poetry

WORKDIR /MLmodels

COPY . ./

RUN poetry install --no-root

EXPOSE 8001

CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
