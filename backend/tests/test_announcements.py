from collections.abc import Generator

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.api.dependencies import get_db
from app.core.security import hash_password
from app.db.base import Base
from app.main import app
from app.models.user import User, UserRole


def test_only_published_announcements_are_visible_to_visitors(tmp_path) -> None:
    database_url = f"sqlite:///{tmp_path / 'test.db'}"
    engine = create_engine(database_url, connect_args={"check_same_thread": False})
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
            db.add(
                User(
                    name="Administrador",
                    email="admin@emef.example.com",
                    password_hash=hash_password("UmaSenhaSegura#2026"),
                    role=UserRole.ADMIN,
                )
            )
            db.commit()

        with TestClient(app) as client:
            login_response = client.post(
                "/api/auth/login",
                json={"email": "admin@emef.example.com", "password": "UmaSenhaSegura#2026"},
            )
            assert login_response.status_code == 200, login_response.json()
            token = login_response.json()["access_token"]

            draft_response = client.post(
                "/api/announcements/admin",
                headers={"Authorization": f"Bearer {token}"},
                json={
                    "title": "Rascunho interno",
                    "content": "Este aviso ainda não deve ser exibido publicamente.",
                    "status": "draft",
                },
            )
            assert draft_response.status_code == 201

            published_response = client.post(
                "/api/announcements/admin",
                headers={"Authorization": f"Bearer {token}"},
                json={
                    "title": "Reunião de famílias",
                    "content": "A reunião será realizada na próxima quarta-feira, às 19 horas.",
                    "category": "Comunicado",
                    "status": "published",
                },
            )
            assert published_response.status_code == 201

            public_response = client.get("/api/announcements")
            assert public_response.status_code == 200
            public_announcements = public_response.json()
            assert [announcement["title"] for announcement in public_announcements] == ["Reunião de famílias"]
    finally:
        app.dependency_overrides.clear()
        Base.metadata.drop_all(bind=engine)
        engine.dispose()
