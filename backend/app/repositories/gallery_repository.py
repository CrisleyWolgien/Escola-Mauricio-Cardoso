from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from app.models.gallery import GalleryAlbum, GalleryPhoto


class GalleryRepository:
    def get_album(self, db: Session, album_id: int) -> GalleryAlbum | None:
        return db.get(GalleryAlbum, album_id)

    def get_photo(self, db: Session, photo_id: int) -> GalleryPhoto | None:
        return db.get(GalleryPhoto, photo_id)

    def list_public_albums(self, db: Session) -> list[GalleryAlbum]:
        return list(db.scalars(select(GalleryAlbum).where(GalleryAlbum.is_published.is_(True)).order_by(GalleryAlbum.event_date.desc(), GalleryAlbum.id.desc())))

    def list_albums(self, db: Session) -> list[GalleryAlbum]:
        return list(db.scalars(select(GalleryAlbum).order_by(GalleryAlbum.event_date.desc(), GalleryAlbum.id.desc())))

    def list_photos(self, db: Session, album_id: int, public_only: bool = False) -> list[GalleryPhoto]:
        statement = select(GalleryPhoto).where(GalleryPhoto.album_id == album_id)
        if public_only:
            statement = statement.where(GalleryPhoto.is_published.is_(True))
        return list(db.scalars(statement.order_by(GalleryPhoto.display_order, GalleryPhoto.id)))

    def save(self, db: Session, entity: GalleryAlbum | GalleryPhoto):
        db.add(entity)
        db.commit()
        db.refresh(entity)
        return entity

    def delete(self, db: Session, entity: GalleryAlbum | GalleryPhoto) -> None:
        if isinstance(entity, GalleryAlbum):
            db.execute(delete(GalleryPhoto).where(GalleryPhoto.album_id == entity.id))
        db.delete(entity)
        db.commit()
