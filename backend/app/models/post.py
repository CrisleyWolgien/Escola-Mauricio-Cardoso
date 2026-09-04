from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.announcement import PublicationStatus


class Post(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(160))
    summary: Mapped[str] = mapped_column(String(280))
    content: Mapped[str] = mapped_column(Text)
    category: Mapped[str] = mapped_column(String(60), default="Projetos")
    status: Mapped[PublicationStatus] = mapped_column(default=PublicationStatus.DRAFT, index=True)
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True, index=True)
    author_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    images: Mapped[list["PostImage"]] = relationship(back_populates="post", cascade="all, delete-orphan", order_by="PostImage.display_order")


class PostImage(Base):
    __tablename__ = "post_images"

    id: Mapped[int] = mapped_column(primary_key=True)
    post_id: Mapped[int] = mapped_column(ForeignKey("posts.id", ondelete="CASCADE"), index=True)
    image_url: Mapped[str] = mapped_column(String(2048))
    caption: Mapped[str | None] = mapped_column(String(240), nullable=True)
    display_order: Mapped[int] = mapped_column(Integer, default=0)
    is_published: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    post: Mapped[Post] = relationship(back_populates="images")
