from sqlalchemy.orm import Session

from app.models.game import EducationalGame
from app.repositories.game_repository import GameRepository
from app.schemas.game import GameUpdate, GameWrite


class GameNotFoundError(Exception):
    pass


class GameService:
    def __init__(self, repository: GameRepository) -> None:
        self.repository = repository

    def list(self, db: Session, public_only: bool = False) -> list[EducationalGame]:
        return self.repository.list(db, public_only)

    def create(self, db: Session, payload: GameWrite, author_id: int) -> EducationalGame:
        values = payload.model_dump()
        values["game_url"] = str(values["game_url"])
        values["image_url"] = str(values["image_url"]) if values["image_url"] else None
        return self.repository.save(db, EducationalGame(**values, author_id=author_id))

    def update(self, db: Session, game_id: int, payload: GameUpdate) -> EducationalGame:
        game = self.repository.get(db, game_id)
        if game is None:
            raise GameNotFoundError
        for field, value in payload.model_dump(exclude_unset=True).items():
            setattr(game, field, str(value) if field.endswith("_url") and value else value)
        return self.repository.save(db, game)

    def delete(self, db: Session, game_id: int) -> None:
        game = self.repository.get(db, game_id)
        if game is None:
            raise GameNotFoundError
        self.repository.delete(db, game)
