from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.api.dependencies import require_admin
from app.db.session import get_db
from app.models.user import User
from app.repositories.announcement_repository import AnnouncementRepository
from app.schemas.announcement import AnnouncementCreate, AnnouncementRead, AnnouncementUpdate
from app.services.announcement_service import AnnouncementNotFoundError, AnnouncementService

router = APIRouter(prefix="/announcements", tags=["announcements"])


def get_announcement_service() -> AnnouncementService:
    return AnnouncementService(AnnouncementRepository())


@router.get("", response_model=list[AnnouncementRead])
def list_public_announcements(
    db: Session = Depends(get_db), service: AnnouncementService = Depends(get_announcement_service)
) -> list[AnnouncementRead]:
    return service.list_public(db)


@router.get("/admin", response_model=list[AnnouncementRead])
def list_all_announcements(
    db: Session = Depends(get_db),
    service: AnnouncementService = Depends(get_announcement_service),
    _: User = Depends(require_admin),
) -> list[AnnouncementRead]:
    return service.list_all(db)


@router.get("/{announcement_id}", response_model=AnnouncementRead)
def get_public_announcement(
    announcement_id: int,
    db: Session = Depends(get_db),
    service: AnnouncementService = Depends(get_announcement_service),
) -> AnnouncementRead:
    try:
        return service.get_public(db, announcement_id)
    except AnnouncementNotFoundError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notícia não encontrada") from error


@router.post("/admin", response_model=AnnouncementRead, status_code=status.HTTP_201_CREATED)
def create_announcement(
    payload: AnnouncementCreate,
    db: Session = Depends(get_db),
    service: AnnouncementService = Depends(get_announcement_service),
    current_user: User = Depends(require_admin),
) -> AnnouncementRead:
    return service.create(db, payload, current_user.id)


@router.patch("/admin/{announcement_id}", response_model=AnnouncementRead)
def update_announcement(
    announcement_id: int,
    payload: AnnouncementUpdate,
    db: Session = Depends(get_db),
    service: AnnouncementService = Depends(get_announcement_service),
    _: User = Depends(require_admin),
) -> AnnouncementRead:
    try:
        return service.update(db, announcement_id, payload)
    except AnnouncementNotFoundError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Aviso não encontrado") from error


@router.delete("/admin/{announcement_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_announcement(
    announcement_id: int,
    db: Session = Depends(get_db),
    service: AnnouncementService = Depends(get_announcement_service),
    _: User = Depends(require_admin),
) -> Response:
    try:
        service.delete(db, announcement_id)
    except AnnouncementNotFoundError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Aviso não encontrado") from error
    return Response(status_code=status.HTTP_204_NO_CONTENT)
