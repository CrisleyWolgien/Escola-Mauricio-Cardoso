from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.announcement import Announcement, PublicationStatus


class AnnouncementRepository:
    def get_by_id(self, db: Session, announcement_id: int) -> Announcement | None:
        return db.get(Announcement, announcement_id)

    def list_public(self, db: Session) -> list[Announcement]:
        statement = (
            select(Announcement)
            .where(Announcement.status == PublicationStatus.PUBLISHED)
            .order_by(Announcement.published_at.desc(), Announcement.id.desc())
        )
        return list(db.scalars(statement))

    def list_all(self, db: Session) -> list[Announcement]:
        return list(db.scalars(select(Announcement).order_by(Announcement.created_at.desc(), Announcement.id.desc())))

    def save(self, db: Session, announcement: Announcement) -> Announcement:
        db.add(announcement)
        db.commit()
        db.refresh(announcement)
        return announcement

    def delete(self, db: Session, announcement: Announcement) -> None:
        db.delete(announcement)
        db.commit()
