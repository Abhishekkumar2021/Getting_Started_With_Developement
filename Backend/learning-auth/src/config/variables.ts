import dotenv from "dotenv"
dotenv.config()

export const {
    PORT,
    SESSION_EXPIRATION,
    AUTH_JWT,
    ACCESS_TOKEN_EXPIRATION,
    REFRESH_TOKEN_EXPIRATION,
    JWT_SECRET_KEY
} = process.env