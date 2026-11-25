import * as joi from "joi"

export const envValidationSchema = joi.object({
    JWT_ACCESS_TOKEN_SECRET:joi.string().required(),
    JWT_REFRESH_TOKEN_SECRET:joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRES:joi.string().required(),
    JWT_REFRESH_TOKEN_EXPIRES:joi.string().required(),
    DATABASE_URL:joi.string().required(),
    DIRECT_URL:joi.string().required(),
    CLOUDINARY_CLOUD_NAME:joi.string().required(),
    CLOUDINARY_API_KEY:joi.string().required(),
    CLOUDINARY_API_SECRET:joi.string().required(),
    GOOGLE_CLIENT_ID:joi.string().required(),
    GOOGLE_CLIENT_SECRET:joi.string().required(),
})