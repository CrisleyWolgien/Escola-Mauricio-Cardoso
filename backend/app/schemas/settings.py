from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, HttpUrl


class SettingsUpdate(BaseModel):
    school_name: str = Field(min_length=3, max_length=200)
    school_description: str | None = Field(default=None, max_length=5_000)
    address: str = Field(min_length=5, max_length=300)
    phone: str = Field(min_length=8, max_length=30)
    whatsapp: str = Field(min_length=10, max_length=30)
    email: str | None = Field(default=None, max_length=255)
    instagram_url: HttpUrl | None = None
    facebook_url: HttpUrl | None = None


class SettingsRead(SettingsUpdate):
    model_config = ConfigDict(from_attributes=True)
    id: int
    instagram_url: str | None
    facebook_url: str | None
    updated_at: datetime
