from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field, HttpUrl


class AlbumWrite(BaseModel):
    title: str = Field(min_length=3, max_length=160)
    description: str | None = Field(default=None, max_length=5_000)
    event_date: date | None = None
    is_published: bool = False


class AlbumUpdate(AlbumWrite):
    title: str | None = Field(default=None, min_length=3, max_length=160)


class PhotoWrite(BaseModel):
    image_url: HttpUrl
    caption: str | None = Field(default=None, max_length=300)
    display_order: int = Field(default=0, ge=0, le=10_000)
    is_published: bool = False


class PhotoUpdate(PhotoWrite):
    image_url: HttpUrl | None = None


class PhotoRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    album_id: int
    image_url: str
    caption: str | None
    display_order: int
    is_published: bool
    created_at: datetime


class AlbumRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    description: str | None
    event_date: date | None
    is_published: bool
    created_at: datetime
    updated_at: datetime
