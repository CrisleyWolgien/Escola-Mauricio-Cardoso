from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, HttpUrl

from app.models.announcement import PublicationStatus


class PostWrite(BaseModel):
    title: str = Field(min_length=4, max_length=160)
    summary: str = Field(min_length=10, max_length=280)
    content: str = Field(min_length=10, max_length=10_000)
    category: str = Field(default="Projetos", min_length=2, max_length=60)
    status: PublicationStatus = PublicationStatus.DRAFT


class PostUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=4, max_length=160)
    summary: str | None = Field(default=None, min_length=10, max_length=280)
    content: str | None = Field(default=None, min_length=10, max_length=10_000)
    category: str | None = Field(default=None, min_length=2, max_length=60)
    status: PublicationStatus | None = None


class PostImageWrite(BaseModel):
    image_url: HttpUrl
    caption: str | None = Field(default=None, max_length=240)
    display_order: int = Field(default=0, ge=0, le=999)
    is_published: bool = False


class PostImageRead(PostImageWrite):
    model_config = ConfigDict(from_attributes=True)
    id: int
    image_url: str


class PostRead(PostWrite):
    model_config = ConfigDict(from_attributes=True)
    id: int
    published_at: datetime | None
    created_at: datetime
    updated_at: datetime
    images: list[PostImageRead] = []
