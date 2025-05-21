import express, { Express } from "express"
import { AUTH_JWT, PORT } from "./config/variables"
import client from "./db/client"
import logger from "./config/logger"
import authRouter from "./routes/auth"
import { HttpStatus } from "./common/constants"
import cookieParser from "cookie-parser"
import sensitiveRouter from "./routes/sensitive"
import { jwtAuthMiddleware, sessionAuthMiddleware } from "./middlewares/auth"

const server = express()

// Middleware
server.use(express.json())
server.use(cookieParser())
if (parseInt(AUTH_JWT as string) == 0) server.use(sessionAuthMiddleware)
else server.use(jwtAuthMiddleware)

// Routes
server.use("/api/v1/auth", authRouter)
server.use("/api/v1/sensitive", sensitiveRouter)

// Health check endpoint
server.get("/health", (req, res) => {
    res.status(HttpStatus.OK).json({
        message: "Server is up and running!"
    })
})

async function startServer(server: Express) {
    try {
        await client.$connect();
        logger.info("Connected to DB");

        server.listen(PORT, () => {
            logger.info(`Server started at port ${PORT}`);
        });
    } catch (error) {
        logger.error("Failed to connect to DB!", error);
        process.exit(1);
    }
}

startServer(server);