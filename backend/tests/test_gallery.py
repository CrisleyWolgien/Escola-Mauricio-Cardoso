from collections.abc import Generator

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.api.dependencies import get_db
from app.core.security import hash_password
from app.db.base import Base
from app.main import app
from app.models.user import User, UserRole


def test_only_published_gallery_content_is_public(tmp_path) -> None:
    engine = create_engine(f"sqlite:///{tmp_path / 'gallery.db'}", connect_args={"check_same_thread": False})
    testing_session = sessionmaker(bind=engine, autoflush=False, autocommit=False)
    Base.metadata.create_all(bind=engine)

    def override_get_db() -> Generator[Session, None, None]:
        db = testing_session()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    try:
        with testing_session() as db:
            db.add(User(name="Direção", email="galeria@emef.example.com", password_hash=hash_password("SenhaDaGaleria#2026"), role=UserRole.ADMIN))
            db.commit()

        with TestClient(app) as client:
            login = client.post("/api/auth/login", json={"email": "galeria@emef.example.com", "password": "SenhaDaGaleria#2026"})
            headers = {"Authorization": f"Bearer {login.json()['access_token']}"}
            album = client.post("/api/gallery/admin/albums", headers=headers, json={"title": "Feira Cultural", "is_published": True})
            assert album.status_code == 201
            album_id = album.json()["id"]

            photo = client.post(
                f"/api/gallery/admin/albums/{album_id}/photos",
                headers=headers,
                json={"image_url": "https://example.com/feira.jpg", "caption": "Turmas na feira", "is_published": True},
            )
            assert photo.status_code == 201

            public_albums = client.get("/api/gallery/albums")
            public_photos = client.get(f"/api/gallery/albums/{album_id}/photos")
            assert [item["title"] for item in public_albums.json()] == ["Feira Cultural"]
            assert [item["caption"] for item in public_photos.json()] == ["Turmas na feira"]
    finally:
        app.dependency_overrides.clear()
        Base.metadata.drop_all(bind=engine)
        engine.dispose()
