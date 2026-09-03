from sqlalchemy.orm import Session

from app.core.security import verify_password
from app.models.user import User
from app.repositories.user_repository import UserRepository


class InvalidCredentialsError(Exception):
    pass


class AuthService:
    def __init__(self, user_repository: UserRepository) -> None:
        self.user_repository = user_repository

    def authenticate(self, db: Session, email: str, password: str) -> User:
        user = self.user_repository.get_by_email(db, email)
        if not user or not user.is_active or not verify_password(password, user.password_hash):
            raise InvalidCredentialsError
        return user
