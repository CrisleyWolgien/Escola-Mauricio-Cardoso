from typing import Annotated

import httpx
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from app.api.dependencies import require_admin
from app.core.config import get_settings
from app.models.user import User
from app.schemas.upload import ImageUploadRead

router = APIRouter(prefix="/uploads", tags=["uploads"])

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024


@router.post("/images", response_model=ImageUploadRead, status_code=status.HTTP_201_CREATED)
async def upload_image(
    file: Annotated[UploadFile, File(description="Imagem JPEG, PNG ou WebP de até 10 MB")],
    _: User = Depends(require_admin),
) -> ImageUploadRead:
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, detail="Envie uma imagem JPEG, PNG ou WebP")

    content = await file.read(MAX_IMAGE_SIZE_BYTES + 1)
    if not content:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A imagem está vazia")
    if len(content) > MAX_IMAGE_SIZE_BYTES:
        raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail="A imagem deve ter no máximo 10 MB")

    settings = get_settings()
    if not all((settings.cloudinary_cloud_name, settings.cloudinary_api_key, settings.cloudinary_api_secret)):
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="O armazenamento de imagens ainda não foi configurado")

    endpoint = f"https://api.cloudinary.com/v1_1/{settings.cloudinary_cloud_name}/image/upload"
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                endpoint,
                auth=(settings.cloudinary_api_key, settings.cloudinary_api_secret),
                data={"folder": settings.cloudinary_folder},
                files={"file": (file.filename or "imagem", content, file.content_type)},
            )
        response.raise_for_status()
    except httpx.HTTPError as error:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Não foi possível enviar a imagem agora") from error

    image_url = response.json().get("secure_url")
    if not image_url:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="O armazenamento não retornou a URL da imagem")
    return ImageUploadRead(image_url=image_url)
