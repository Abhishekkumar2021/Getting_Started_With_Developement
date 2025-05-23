import dotenv from "dotenv"
dotenv.config()

export const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    SERVER_PORT,
    BASE_URL
} = process.env