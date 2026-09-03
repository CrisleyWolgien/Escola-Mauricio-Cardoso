from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, HttpUrl

from app.models.announcement import PublicationStatus


class AnnouncementCreate(BaseModel):
    title: str = Field(min_length=4, max_length=160)
    content: str = Field(min_length=10, max_length=10_000)
    category: str = Field(default="Geral", min_length=2, max_length=60)
    cover_image_url: HttpUrl | None = None
    status: PublicationStatus = PublicationStatus.DRAFT


class AnnouncementUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=4, max_length=160)
    content: str | None = Field(default=None, min_length=10, max_length=10_000)
    category: str | None = Field(default=None, min_length=2, max_length=60)
    cover_image_url: HttpUrl | None = None
    status: PublicationStatus | None = None


class AnnouncementRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    content: str
    category: str
    cover_image_url: str | None
    status: PublicationStatus
    published_at: datetime | None
    created_at: datetime
    updated_at: datetime
