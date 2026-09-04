from pydantic import BaseModel, HttpUrl


class ImageUploadRead(BaseModel):
    image_url: HttpUrl
