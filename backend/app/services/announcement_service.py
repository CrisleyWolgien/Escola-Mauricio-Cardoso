from datetime import UTC, datetime

from sqlalchemy.orm import Session

from app.models.announcement import Announcement, PublicationStatus
from app.repositories.announcement_repository import AnnouncementRepository
from app.schemas.announcement import AnnouncementCreate, AnnouncementUpdate


class AnnouncementNotFoundError(Exception):
    pass


class AnnouncementService:
    def __init__(self, repository: AnnouncementRepository) -> None:
        self.repository = repository

    def list_public(self, db: Session) -> list[Announcement]:
        return self.repository.list_public(db)

    def list_all(self, db: Session) -> list[Announcement]:
        return self.repository.list_all(db)

    def create(self, db: Session, payload: AnnouncementCreate, author_id: int) -> Announcement:
        published_at = datetime.now(UTC) if payload.status == PublicationStatus.PUBLISHED else None
        announcement = Announcement(
            title=payload.title,
            content=payload.content,
            category=payload.category,
            cover_image_url=str(payload.cover_image_url) if payload.cover_image_url else None,
            status=payload.status,
            published_at=published_at,
            author_id=author_id,
        )
        return self.repository.save(db, announcement)

    def update(self, db: Session, announcement_id: int, payload: AnnouncementUpdate) -> Announcement:
        announcement = self.repository.get_by_id(db, announcement_id)
        if announcement is None:
            raise AnnouncementNotFoundError

        values = payload.model_dump(exclude_unset=True)
        if "cover_image_url" in values:
            values["cover_image_url"] = str(values["cover_image_url"]) if values["cover_image_url"] else None
        for field, value in values.items():
            setattr(announcement, field, value)
        if announcement.status == PublicationStatus.PUBLISHED and announcement.published_at is None:
            announcement.published_at = datetime.now(UTC)
        if announcement.status == PublicationStatus.DRAFT:
            announcement.published_at = None
        return self.repository.save(db, announcement)

    def delete(self, db: Session, announcement_id: int) -> None:
        announcement = self.repository.get_by_id(db, announcement_id)
        if announcement is None:
            raise AnnouncementNotFoundError
        self.repository.delete(db, announcement)
