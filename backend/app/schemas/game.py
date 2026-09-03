from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, HttpUrl, model_validator


class GameWrite(BaseModel):
    title: str = Field(min_length=3, max_length=160)
    description: str = Field(min_length=10, max_length=5_000)
    category: str = Field(min_length=2, max_length=60)
    grade_from: int = Field(ge=1, le=5)
    grade_to: int = Field(ge=1, le=5)
    image_url: HttpUrl | None = None
    game_url: HttpUrl
    is_published: bool = False

    @model_validator(mode="after")
    def validate_grades(self) -> "GameWrite":
        if self.grade_to is not None and self.grade_from is not None and self.grade_to < self.grade_from:
            raise ValueError("A série final não pode ser menor que a inicial")
        return self


class GameUpdate(GameWrite):
    title: str | None = Field(default=None, min_length=3, max_length=160)
    description: str | None = Field(default=None, min_length=10, max_length=5_000)
    category: str | None = Field(default=None, min_length=2, max_length=60)
    grade_from: int | None = Field(default=None, ge=1, le=5)
    grade_to: int | None = Field(default=None, ge=1, le=5)
    game_url: HttpUrl | None = None


class GameRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    description: str
    category: str
    grade_from: int
    grade_to: int
    image_url: str | None
    game_url: str
    is_published: bool
    created_at: datetime
    updated_at: datetime
