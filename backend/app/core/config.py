from functools import lru_cache
from typing import Literal

from pydantic import AnyHttpUrl, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configurações centralizadas da aplicação."""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "API EMEF Maurício Cardoso"
    environment: Literal["development", "test", "production"] = "development"
    database_url: str = "sqlite:///./escola.db"
    jwt_secret_key: str = Field(min_length=32)
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = Field(default=15, ge=5, le=60)
    refresh_token_expire_days: int = Field(default=7, ge=1, le=30)
    allowed_origins: list[AnyHttpUrl] = []


@lru_cache
def get_settings() -> Settings:
    return Settings()
