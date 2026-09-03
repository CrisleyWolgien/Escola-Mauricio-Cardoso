from datetime import UTC, datetime

from sqlalchemy.orm import Session

from app.models.event import SchoolEvent
from app.repositories.event_repository import EventRepository
from app.schemas.event import EventUpdate, EventWrite


class EventNotFoundError(Exception):
    pass


class EventService:
    def __init__(self, repository: EventRepository) -> None:
        self.repository = repository

    def list_public(self, db: Session) -> list[SchoolEvent]:
        return self.repository.list_public(db, datetime.now(UTC))

    def list_all(self, db: Session) -> list[SchoolEvent]:
        return self.repository.list_all(db)

    def create(self, db: Session, payload: EventWrite, author_id: int) -> SchoolEvent:
        return self.repository.save(db, SchoolEvent(**payload.model_dump(), author_id=author_id))

    def update(self, db: Session, event_id: int, payload: EventUpdate) -> SchoolEvent:
        event = self.repository.get_by_id(db, event_id)
        if event is None:
            raise EventNotFoundError
        for field, value in payload.model_dump(exclude_unset=True).items():
            setattr(event, field, value)
        return self.repository.save(db, event)

    def delete(self, db: Session, event_id: int) -> None:
        event = self.repository.get_by_id(db, event_id)
        if event is None:
            raise EventNotFoundError
        self.repository.delete(db, event)
