import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import { AUTHORIZATION_PREFIX, HttpStatus } from "../common/constants";
import client from "../db/client";
import { JWT } from "../utility/jwt";
import { JWT_SECRET_KEY } from "../config/variables";

export async function sessionAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        // Endpoint exception from auth middleware
        const endpoint = req.path
        logger.info({ endpoint })
        if (endpoint.includes("register") || endpoint.includes("login")) {
            next()
            return;
        }

        // check if cookie is there is req or not
        const cookies = req.cookies

        logger.info({
            cookies: cookies
        })

        if (!cookies.SESSION_ID) {
            logger.error("Session id is missing in cookies")
            res.status(HttpStatus.UNAUTHORIZED).json({
                error: "Missing session id"
            })
            return;
        }

        const session = await client.session.findUnique({
            where: {
                id: cookies.SESSION_ID
            },
            select: {
                expiration: true,
                userId: true
            }
        })

        if (!session) {
            logger.error("Invalid session id")
            res.status(HttpStatus.UNAUTHORIZED).json({
                error: "Invalid session id"
            })
            return;
        }

        if (session.expiration <= new Date()) {
            logger.error("Session expired")
            res.status(HttpStatus.UNAUTHORIZED).json({
                error: "Your session has been expired"
            })
            return;
        }

        req.userId = session.userId
        next()
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: (error instanceof Error) ? error.message : "Internal server error"
        })
    }
}

export async function jwtAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const endpoint = req.path
        logger.info({ endpoint })
        const excluded = ["/api/v1/auth/register", "/api/v1/auth/login", "/api/v1/auth/refresh-token"]
        if (excluded.includes(endpoint)) {
            next()
            return;
        }

        const { authorization } = req.headers

        if (!authorization) {
            logger.error("Authorization header is missing")
            res.status(HttpStatus.UNAUTHORIZED).json({
                error: "Authorization header is missing"
            })
            return;
        }

        const token = authorization.substring(AUTHORIZATION_PREFIX.length)

        if (!token) {
            logger.error("Token is missing")
            res.status(HttpStatus.UNAUTHORIZED).json({
                error: "Token is missing"
            })
            return;
        }

        const payload = JWT.decode(token, JWT_SECRET_KEY!)

        req.userId = payload.userId
        next()
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: (error instanceof Error) ? error.message : "Internal server error"
        })
    }
}