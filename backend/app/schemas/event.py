from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, model_validator


class EventWrite(BaseModel):
    title: str = Field(min_length=4, max_length=160)
    description: str | None = Field(default=None, max_length=5_000)
    event_type: str = Field(default="Evento", min_length=2, max_length=60)
    starts_at: datetime
    ends_at: datetime | None = None
    location: str | None = Field(default=None, max_length=160)
    is_published: bool = False

    @model_validator(mode="after")
    def validate_period(self) -> "EventWrite":
        if self.ends_at and self.ends_at < self.starts_at:
            raise ValueError("O término do evento não pode ser anterior ao início")
        return self


class EventUpdate(EventWrite):
    title: str | None = Field(default=None, min_length=4, max_length=160)
    event_type: str | None = Field(default=None, min_length=2, max_length=60)
    starts_at: datetime | None = None

    @model_validator(mode="after")
    def validate_optional_period(self) -> "EventUpdate":
        if self.starts_at and self.ends_at and self.ends_at < self.starts_at:
            raise ValueError("O término do evento não pode ser anterior ao início")
        return self


class EventRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str | None
    event_type: str
    starts_at: datetime
    ends_at: datetime | None
    location: str | None
    is_published: bool
    created_at: datetime
    updated_at: datetime
