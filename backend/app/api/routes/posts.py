from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.api.dependencies import require_admin
from app.db.session import get_db
from app.models.announcement import PublicationStatus
from app.models.post import Post, PostImage
from app.models.user import User
from app.schemas.post import PostImageRead, PostImageWrite, PostRead, PostUpdate, PostWrite

router = APIRouter(prefix="/posts", tags=["posts"])


def get_post(db: Session, post_id: int, public_only: bool = False) -> Post:
    statement = select(Post).options(selectinload(Post.images)).where(Post.id == post_id)
    if public_only:
        statement = statement.where(Post.status == PublicationStatus.PUBLISHED)
    post = db.scalar(statement)
    if post is None:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    return post


@router.get("", response_model=list[PostRead])
def list_public(db: Session = Depends(get_db)) -> list[Post]:
    statement = select(Post).options(selectinload(Post.images)).where(Post.status == PublicationStatus.PUBLISHED).order_by(Post.published_at.desc(), Post.id.desc())
    posts = list(db.scalars(statement))
    for post in posts:
        post.images = [image for image in post.images if image.is_published]
    return posts


@router.get("/admin", response_model=list[PostRead])
def list_admin(db: Session = Depends(get_db), _: User = Depends(require_admin)) -> list[Post]:
    return list(db.scalars(select(Post).options(selectinload(Post.images)).order_by(Post.created_at.desc(), Post.id.desc())))


@router.get("/{post_id}", response_model=PostRead)
def get_public(post_id: int, db: Session = Depends(get_db)) -> Post:
    post = get_post(db, post_id, public_only=True)
    post.images = [image for image in post.images if image.is_published]
    return post


@router.post("/admin", response_model=PostRead, status_code=status.HTTP_201_CREATED)
def create(payload: PostWrite, db: Session = Depends(get_db), user: User = Depends(require_admin)) -> Post:
    post = Post(**payload.model_dump(), author_id=user.id)
    if post.status == PublicationStatus.PUBLISHED:
        post.published_at = datetime.now(UTC)
    db.add(post); db.commit(); db.refresh(post)
    return post


@router.patch("/admin/{post_id}", response_model=PostRead)
def update(post_id: int, payload: PostUpdate, db: Session = Depends(get_db), _: User = Depends(require_admin)) -> Post:
    post = get_post(db, post_id)
    for field, value in payload.model_dump(exclude_unset=True).items(): setattr(post, field, value)
    if post.status == PublicationStatus.PUBLISHED and post.published_at is None: post.published_at = datetime.now(UTC)
    if post.status == PublicationStatus.DRAFT: post.published_at = None
    db.commit(); db.refresh(post)
    return post


@router.post("/admin/{post_id}/images", response_model=PostImageRead, status_code=status.HTTP_201_CREATED)
def add_image(post_id: int, payload: PostImageWrite, db: Session = Depends(get_db), _: User = Depends(require_admin)) -> PostImage:
    get_post(db, post_id)
    image = PostImage(post_id=post_id, image_url=str(payload.image_url), caption=payload.caption, display_order=payload.display_order, is_published=payload.is_published)
    db.add(image); db.commit(); db.refresh(image)
    return image


@router.delete("/admin/images/{image_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_image(image_id: int, db: Session = Depends(get_db), _: User = Depends(require_admin)) -> Response:
    image = db.get(PostImage, image_id)
    if image is None: raise HTTPException(status_code=404, detail="Imagem não encontrada")
    db.delete(image); db.commit(); return Response(status_code=204)


@router.delete("/admin/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: int, db: Session = Depends(get_db), _: User = Depends(require_admin)) -> Response:
    db.delete(get_post(db, post_id)); db.commit(); return Response(status_code=204)
