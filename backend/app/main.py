import sentry_sdk
from fastapi import FastAPI, status,  Request
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import app.models.paymentGateway
import app.models.card
import app.models.customer

import os
os.chdir("app/core")
from app.api.main import api_router
from app.core.config import settings
from app.core.security import *

def custom_generate_unique_id(route: APIRoute) -> str:
    return f"{route.tags[0]}-{route.name}"
if settings.SENTRY_DSN and settings.ENVIRONMENT != "local":
    sentry_sdk.init(dsn=str(settings.SENTRY_DSN), enable_tracing=True)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tu lista de orígenes
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
# AÑADE TU MIDDLEWARE DE VERIFICACIÓN DE TOKEN AQUÍ
@app.middleware("http")
async def verify_token_middleware(request: Request, call_next):
    # Rutas excluidas de la verificación de token
    # Puedes usar settings.API_V1_STR para hacer estas rutas más dinámicas
    # Por ejemplo, para /api/v1/docs, sería f"{settings.API_V1_STR}/docs"
    excluded_paths = [
        "/docs",
        f"{settings.API_V1_STR}/openapi.json",
        "/redoc",
        f"{settings.API_V1_STR}/token",
        f"{settings.API_V1_STR}/customer/register/",
        f"{settings.API_V1_STR}/customer/login/"

        # Asumiendo que esta es tu ruta de login/obtención de token
    ]

    # Verifica si la ruta actual está en las excluidas o comienza con /static
    if request.url.path in excluded_paths or request.url.path.startswith("/static"):
        return await call_next(request)

    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Authorization header missing or invalid"},
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = auth_header.split(" ")[1]
    try:
        # Aquí es donde se llama a tu función de decodificación
        decoded_payload = decode_token(token)
        # Opcional: Puedes adjuntar el payload decodificado al objeto request si lo necesitas en los endpoints
        # request.state.user = decoded_payload
    except HTTPException as e: # Captura las HTTPException lanzadas por decode_token
        return JSONResponse(status_code=e.status_code, content={"detail": e.detail}, headers=e.headers)
    except Exception as e: # Captura cualquier otra excepción inesperada
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"detail": f"Internal server error: {e}"})


    return await call_next(request)

app.include_router(api_router, prefix=settings.API_V1_STR)
