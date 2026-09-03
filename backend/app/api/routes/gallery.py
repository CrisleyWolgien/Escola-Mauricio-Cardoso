from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.api.dependencies import require_admin
from app.db.session import get_db
from app.models.user import User
from app.repositories.gallery_repository import GalleryRepository
from app.schemas.gallery import AlbumRead, AlbumUpdate, AlbumWrite, PhotoRead, PhotoUpdate, PhotoWrite
from app.services.gallery_service import GalleryNotFoundError, GalleryService

router = APIRouter(prefix="/gallery", tags=["gallery"])


def get_gallery_service() -> GalleryService:
    return GalleryService(GalleryRepository())


def not_found(error: GalleryNotFoundError) -> HTTPException:
    return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Álbum ou foto não encontrado")


@router.get("/albums", response_model=list[AlbumRead])
def public_albums(db: Session = Depends(get_db), service: GalleryService = Depends(get_gallery_service)) -> list[AlbumRead]:
    return service.list_albums(db, public_only=True)


@router.get("/albums/{album_id}/photos", response_model=list[PhotoRead])
def public_photos(album_id: int, db: Session = Depends(get_db), service: GalleryService = Depends(get_gallery_service)) -> list[PhotoRead]:
    try:
        return service.list_photos(db, album_id, public_only=True)
    except GalleryNotFoundError as error:
        raise not_found(error) from error


@router.get("/admin/albums", response_model=list[AlbumRead])
def admin_albums(db: Session = Depends(get_db), service: GalleryService = Depends(get_gallery_service), _: User = Depends(require_admin)) -> list[AlbumRead]:
    return service.list_albums(db)


@router.post("/admin/albums", response_model=AlbumRead, status_code=status.HTTP_201_CREATED)
def create_album(payload: AlbumWrite, db: Session = Depends(get_db), service: GalleryService = Depends(get_gallery_service), current_user: User = Depends(require_admin)) -> AlbumRead:
    return service.create_album(db, payload, current_user.id)


@router.patch("/admin/albums/{album_id}", response_model=AlbumRead)
def update_album(album_id: int, payload: AlbumUpdate, db: Session = Depends(get_db), service: GalleryService = Depends(get_gallery_service), _: User = Depends(require_admin)) -> AlbumRead:
    try:
        return service.update_album(db, album_id, payload)
    except GalleryNotFoundError as error:
        raise not_found(error) from error


@router.post("/admin/albums/{album_id}/photos", response_model=PhotoRead, status_code=status.HTTP_201_CREATED)
def create_photo(album_id: int, payload: PhotoWrite, db: Session = Depends(get_db), service: GalleryService = Depends(get_gallery_service), _: User = Depends(require_admin)) -> PhotoRead:
    try:
        return service.create_photo(db, album_id, payload)
    except GalleryNotFoundError as error:
        raise not_found(error) from error


@router.patch("/admin/photos/{photo_id}", response_model=PhotoRead)
def update_photo(photo_id: int, payload: PhotoUpdate, db: Session = Depends(get_db), service: GalleryService = Depends(get_gallery_service), _: User = Depends(require_admin)) -> PhotoRead:
    try:
        return service.update_photo(db, photo_id, payload)
    except GalleryNotFoundError as error:
        raise not_found(error) from error


@router.delete("/admin/albums/{album_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_album(album_id: int, db: Session = Depends(get_db), service: GalleryService = Depends(get_gallery_service), _: User = Depends(require_admin)) -> Response:
    try:
        service.delete_album(db, album_id)
    except GalleryNotFoundError as error:
        raise not_found(error) from error
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.delete("/admin/photos/{photo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_photo(photo_id: int, db: Session = Depends(get_db), service: GalleryService = Depends(get_gallery_service), _: User = Depends(require_admin)) -> Response:
    try:
        service.delete_photo(db, photo_id)
    except GalleryNotFoundError as error:
        raise not_found(error) from error
    return Response(status_code=status.HTTP_204_NO_CONTENT)
