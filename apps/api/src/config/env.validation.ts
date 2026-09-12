import * as joi from "joi"

export const envValidationSchema = joi.object({
    JWT_ACCESS_TOKEN_SECRET:joi.string().required(),
    JWT_REFRESH_TOKEN_SECRET:joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRES:joi.string().required(),
    JWT_REFRESH_TOKEN_EXPIRES:joi.string().required(),

})