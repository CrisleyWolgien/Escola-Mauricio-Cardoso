from sqlalchemy.orm import Session

from app.models.gallery import GalleryAlbum, GalleryPhoto
from app.repositories.gallery_repository import GalleryRepository
from app.schemas.gallery import AlbumUpdate, AlbumWrite, PhotoUpdate, PhotoWrite


class GalleryNotFoundError(Exception):
    pass


class GalleryService:
    def __init__(self, repository: GalleryRepository) -> None:
        self.repository = repository

    def list_albums(self, db: Session, public_only: bool = False) -> list[GalleryAlbum]:
        return self.repository.list_public_albums(db) if public_only else self.repository.list_albums(db)

    def list_photos(self, db: Session, album_id: int, public_only: bool = False) -> list[GalleryPhoto]:
        album = self.repository.get_album(db, album_id)
        if album is None or (public_only and not album.is_published):
            raise GalleryNotFoundError
        return self.repository.list_photos(db, album_id, public_only)

    def create_album(self, db: Session, payload: AlbumWrite, author_id: int) -> GalleryAlbum:
        return self.repository.save(db, GalleryAlbum(**payload.model_dump(), author_id=author_id))

    def update_album(self, db: Session, album_id: int, payload: AlbumUpdate) -> GalleryAlbum:
        album = self.repository.get_album(db, album_id)
        if album is None:
            raise GalleryNotFoundError
        for field, value in payload.model_dump(exclude_unset=True).items():
            setattr(album, field, value)
        return self.repository.save(db, album)

    def create_photo(self, db: Session, album_id: int, payload: PhotoWrite) -> GalleryPhoto:
        if self.repository.get_album(db, album_id) is None:
            raise GalleryNotFoundError
        values = payload.model_dump()
        values["image_url"] = str(values["image_url"])
        return self.repository.save(db, GalleryPhoto(**values, album_id=album_id))

    def update_photo(self, db: Session, photo_id: int, payload: PhotoUpdate) -> GalleryPhoto:
        photo = self.repository.get_photo(db, photo_id)
        if photo is None:
            raise GalleryNotFoundError
        for field, value in payload.model_dump(exclude_unset=True).items():
            setattr(photo, field, str(value) if field == "image_url" and value else value)
        return self.repository.save(db, photo)

    def delete_album(self, db: Session, album_id: int) -> None:
        album = self.repository.get_album(db, album_id)
        if album is None:
            raise GalleryNotFoundError
        self.repository.delete(db, album)

    def delete_photo(self, db: Session, photo_id: int) -> None:
        photo = self.repository.get_photo(db, photo_id)
        if photo is None:
            raise GalleryNotFoundError
        self.repository.delete(db, photo)
