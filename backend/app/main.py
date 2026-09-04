from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi import _rate_limit_exceeded_handler

from app.api.router import api_router
from app.api.routes.auth import limiter
from app.core.config import get_settings
from app.core.security import hash_password
from app.db.base import Base
from app.db.session import SessionLocal, engine
from app import models  # noqa: F401 - registra os modelos SQLAlchemy
from app.models.user import User, UserRole


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    if engine.dialect.name == "sqlite":
        existing_columns = {column["name"] for column in inspect(engine).get_columns("announcements")}
        if "summary" not in existing_columns:
            with engine.begin() as connection:
                connection.execute(text("ALTER TABLE announcements ADD COLUMN summary VARCHAR(280)"))
    if settings.initial_admin_email and settings.initial_admin_password:
        with SessionLocal() as db:
            has_admin = db.query(User.id).filter(User.role == UserRole.ADMIN).first()
            if not has_admin:
                db.add(
                    User(
                        name=settings.initial_admin_name,
                        email=settings.initial_admin_email.lower(),
                        password_hash=hash_password(settings.initial_admin_password),
                        role=UserRole.ADMIN,
                    )
                )
                db.commit()
    yield


settings = get_settings()
app = FastAPI(title=settings.app_name, version="0.1.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.unicode_string().rstrip("/") for origin in settings.allowed_origins],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)
app.add_middleware(SlowAPIMiddleware)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.include_router(api_router)
