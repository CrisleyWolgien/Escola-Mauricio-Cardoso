from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.api.dependencies import require_admin
from app.db.session import get_db
from app.models.user import User
from app.repositories.game_repository import GameRepository
from app.schemas.game import GameRead, GameUpdate, GameWrite
from app.services.game_service import GameNotFoundError, GameService

router = APIRouter(prefix="/games", tags=["games"])


def get_game_service() -> GameService:
    return GameService(GameRepository())


@router.get("", response_model=list[GameRead])
def public_games(db: Session = Depends(get_db), service: GameService = Depends(get_game_service)) -> list[GameRead]:
    return service.list(db, public_only=True)


@router.get("/admin", response_model=list[GameRead])
def admin_games(db: Session = Depends(get_db), service: GameService = Depends(get_game_service), _: User = Depends(require_admin)) -> list[GameRead]:
    return service.list(db)


@router.post("/admin", response_model=GameRead, status_code=status.HTTP_201_CREATED)
def create_game(payload: GameWrite, db: Session = Depends(get_db), service: GameService = Depends(get_game_service), current_user: User = Depends(require_admin)) -> GameRead:
    return service.create(db, payload, current_user.id)


@router.patch("/admin/{game_id}", response_model=GameRead)
def update_game(game_id: int, payload: GameUpdate, db: Session = Depends(get_db), service: GameService = Depends(get_game_service), _: User = Depends(require_admin)) -> GameRead:
    try:
        return service.update(db, game_id, payload)
    except GameNotFoundError as error:
        raise HTTPException(status_code=404, detail="Jogo não encontrado") from error


@router.delete("/admin/{game_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_game(game_id: int, db: Session = Depends(get_db), service: GameService = Depends(get_game_service), _: User = Depends(require_admin)) -> Response:
    try:
        service.delete(db, game_id)
    except GameNotFoundError as error:
        raise HTTPException(status_code=404, detail="Jogo não encontrado") from error
    return Response(status_code=status.HTTP_204_NO_CONTENT)
