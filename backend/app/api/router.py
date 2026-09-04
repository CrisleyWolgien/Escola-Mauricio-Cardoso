from fastapi import APIRouter

from app.api.routes import announcements, auth, events, gallery, games, health, settings, uploads

api_router = APIRouter(prefix="/api")
api_router.include_router(health.router)
api_router.include_router(auth.router)
api_router.include_router(announcements.router)
api_router.include_router(events.router)
api_router.include_router(gallery.router)
api_router.include_router(games.router)
api_router.include_router(settings.router)
api_router.include_router(uploads.router)
