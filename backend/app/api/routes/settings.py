from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import require_admin
from app.db.session import get_db
from app.models.settings import SchoolSettings
from app.models.user import User
from app.schemas.settings import SettingsRead, SettingsUpdate

router = APIRouter(prefix="/settings", tags=["settings"])


def get_or_create(db: Session) -> SchoolSettings:
    settings = db.get(SchoolSettings, 1)
    if settings is None:
        settings = SchoolSettings(id=1, instagram_url="https://www.instagram.com/emefmauricio/", facebook_url="https://www.facebook.com/emefmauriciocardoso.cardoso/")
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings


@router.get("", response_model=SettingsRead)
def public_settings(db: Session = Depends(get_db)) -> SettingsRead:
    return get_or_create(db)


@router.put("", response_model=SettingsRead)
def update_settings(payload: SettingsUpdate, db: Session = Depends(get_db), _: User = Depends(require_admin)) -> SettingsRead:
    settings = get_or_create(db)
    values = payload.model_dump()
    for field, value in values.items():
        setattr(settings, field, str(value) if field.endswith("_url") and value else value)
    db.add(settings)
    db.commit()
    db.refresh(settings)
    return settings
