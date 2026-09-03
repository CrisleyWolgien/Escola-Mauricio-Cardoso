from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.game import EducationalGame


class GameRepository:
    def get(self, db: Session, game_id: int) -> EducationalGame | None:
        return db.get(EducationalGame, game_id)

    def list(self, db: Session, public_only: bool = False) -> list[EducationalGame]:
        statement = select(EducationalGame)
        if public_only:
            statement = statement.where(EducationalGame.is_published.is_(True))
        return list(db.scalars(statement.order_by(EducationalGame.category, EducationalGame.title)))

    def save(self, db: Session, game: EducationalGame) -> EducationalGame:
        db.add(game)
        db.commit()
        db.refresh(game)
        return game

    def delete(self, db: Session, game: EducationalGame) -> None:
        db.delete(game)
        db.commit()
