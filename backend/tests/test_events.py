from collections.abc import Generator

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.api.dependencies import get_db
from app.core.security import hash_password
from app.db.base import Base
from app.main import app
from app.models.user import User, UserRole


def test_public_calendar_only_returns_published_future_events(tmp_path) -> None:
    engine = create_engine(f"sqlite:///{tmp_path / 'events.db'}", connect_args={"check_same_thread": False})
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
            db.add(User(name="Direção", email="direcao@emef.example.com", password_hash=hash_password("OutraSenhaSegura#2026"), role=UserRole.ADMIN))
            db.commit()

        with TestClient(app) as client:
            login_response = client.post("/api/auth/login", json={"email": "direcao@emef.example.com", "password": "OutraSenhaSegura#2026"})
            token = login_response.json()["access_token"]
            headers = {"Authorization": f"Bearer {token}"}

            response = client.post(
                "/api/events/admin",
                headers=headers,
                json={
                    "title": "Feira Cultural",
                    "description": "Atividades culturais com as turmas.",
                    "event_type": "Evento",
                    "starts_at": "2027-10-12T08:00:00Z",
                    "ends_at": "2027-10-12T12:00:00Z",
                    "location": "Quadra coberta",
                    "is_published": True,
                },
            )
            assert response.status_code == 201

            calendar_response = client.get("/api/events")
            assert calendar_response.status_code == 200
            assert [event["title"] for event in calendar_response.json()] == ["Feira Cultural"]
    finally:
        app.dependency_overrides.clear()
        Base.metadata.drop_all(bind=engine)
        engine.dispose()
