from datetime import datetime

from sqlalchemy import DateTime, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class SchoolSettings(Base):
    __tablename__ = "school_settings"

    id: Mapped[int] = mapped_column(primary_key=True, default=1)
    school_name: Mapped[str] = mapped_column(String(200), default="EMEF Maurício Cardoso")
    school_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    address: Mapped[str] = mapped_column(String(300), default="Rua Iriapira, S/N - Zona Rural, Panambi/RS")
    phone: Mapped[str] = mapped_column(String(30), default="+55 55 3376-9100")
    whatsapp: Mapped[str] = mapped_column(String(30), default="555533769100")
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    instagram_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)
    facebook_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
