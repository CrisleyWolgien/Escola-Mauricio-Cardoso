from fastapi import APIRouter

from app.api.routes import announcements, auth, events, gallery, health

api_router = APIRouter(prefix="/api")
api_router.include_router(health.router)
api_router.include_router(auth.router)
api_router.include_router(announcements.router)
api_router.include_router(events.router)
api_router.include_router(gallery.router)
