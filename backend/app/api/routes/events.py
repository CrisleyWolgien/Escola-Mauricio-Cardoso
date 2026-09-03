from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.api.dependencies import require_admin
from app.db.session import get_db
from app.models.user import User
from app.repositories.event_repository import EventRepository
from app.schemas.event import EventRead, EventUpdate, EventWrite
from app.services.event_service import EventNotFoundError, EventService

router = APIRouter(prefix="/events", tags=["events"])


def get_event_service() -> EventService:
    return EventService(EventRepository())


@router.get("", response_model=list[EventRead])
def list_public_events(db: Session = Depends(get_db), service: EventService = Depends(get_event_service)) -> list[EventRead]:
    return service.list_public(db)


@router.get("/admin", response_model=list[EventRead])
def list_all_events(
    db: Session = Depends(get_db), service: EventService = Depends(get_event_service), _: User = Depends(require_admin)
) -> list[EventRead]:
    return service.list_all(db)


@router.post("/admin", response_model=EventRead, status_code=status.HTTP_201_CREATED)
def create_event(
    payload: EventWrite,
    db: Session = Depends(get_db),
    service: EventService = Depends(get_event_service),
    current_user: User = Depends(require_admin),
) -> EventRead:
    return service.create(db, payload, current_user.id)


@router.patch("/admin/{event_id}", response_model=EventRead)
def update_event(
    event_id: int,
    payload: EventUpdate,
    db: Session = Depends(get_db),
    service: EventService = Depends(get_event_service),
    _: User = Depends(require_admin),
) -> EventRead:
    try:
        return service.update(db, event_id, payload)
    except EventNotFoundError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Evento não encontrado") from error


@router.delete("/admin/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(
    event_id: int,
    db: Session = Depends(get_db),
    service: EventService = Depends(get_event_service),
    _: User = Depends(require_admin),
) -> Response:
    try:
        service.delete(db, event_id)
    except EventNotFoundError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Evento não encontrado") from error
    return Response(status_code=status.HTTP_204_NO_CONTENT)
