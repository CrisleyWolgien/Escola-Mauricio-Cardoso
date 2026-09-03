from datetime import datetime

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.event import SchoolEvent


class EventRepository:
    def get_by_id(self, db: Session, event_id: int) -> SchoolEvent | None:
        return db.get(SchoolEvent, event_id)

    def list_public(self, db: Session, from_date: datetime) -> list[SchoolEvent]:
        statement = (
            select(SchoolEvent)
            .where(SchoolEvent.is_published.is_(True), SchoolEvent.starts_at >= from_date)
            .order_by(SchoolEvent.starts_at)
        )
        return list(db.scalars(statement))

    def list_all(self, db: Session) -> list[SchoolEvent]:
        return list(db.scalars(select(SchoolEvent).order_by(SchoolEvent.starts_at.desc())))

    def save(self, db: Session, event: SchoolEvent) -> SchoolEvent:
        db.add(event)
        db.commit()
        db.refresh(event)
        return event

    def delete(self, db: Session, event: SchoolEvent) -> None:
        db.delete(event)
        db.commit()
