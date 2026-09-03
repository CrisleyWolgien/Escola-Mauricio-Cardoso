from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class EducationalGame(Base):
    __tablename__ = "educational_games"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(160))
    description: Mapped[str] = mapped_column(Text)
    category: Mapped[str] = mapped_column(String(60))
    grade_from: Mapped[int] = mapped_column(Integer)
    grade_to: Mapped[int] = mapped_column(Integer)
    image_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)
    game_url: Mapped[str] = mapped_column(String(2048))
    is_published: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    author_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
