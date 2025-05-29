import sentry_sdk
from fastapi import FastAPI
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware

import os
os.chdir("app/core")
from app.api.main import api_router
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
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi import Request, status
from fastapi.responses import JSONResponse


@app.middleware("http")
async def verify_token_middleware(request: Request, call_next):
    if request.method == "OPTIONS":
        return await call_next(request)
    excluded_paths = [
        "/docs",
        f"{settings.API_V1_STR}/openapi.json",
        "/redoc",
        f"{settings.API_V1_STR}/token",
        f"{settings.API_V1_STR}/customer/register",
        f"{settings.API_V1_STR}/customer/login",
        f"{settings.API_V1_STR}/employee/login",
    ]
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
        decoded_payload = decode_token(token)
        request.state.user = decoded_payload
    except HTTPException as e:
        return JSONResponse(status_code=e.status_code, content={"detail": e.detail}, headers=e.headers)
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": f"Internal server error: {e}"}
        )
    return await call_next(request)
app.include_router(api_router, prefix=settings.API_V1_STR)
