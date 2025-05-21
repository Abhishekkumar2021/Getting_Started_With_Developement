"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionAuthMiddleware = sessionAuthMiddleware;
exports.jwtAuthMiddleware = jwtAuthMiddleware;
const logger_1 = __importDefault(require("../config/logger"));
const constants_1 = require("../common/constants");
const client_1 = __importDefault(require("../db/client"));
const jwt_1 = require("../utility/jwt");
const variables_1 = require("../config/variables");
async function sessionAuthMiddleware(req, res, next) {
    try {
        // Endpoint exception from auth middleware
        const endpoint = req.path;
        logger_1.default.info({ endpoint });
        if (endpoint.includes("register") || endpoint.includes("login")) {
            next();
            return;
        }
        // check if cookie is there is req or not
        const cookies = req.cookies;
        logger_1.default.info({
            cookies: cookies
        });
        if (!cookies.SESSION_ID) {
            logger_1.default.error("Session id is missing in cookies");
            res.status(constants_1.HttpStatus.UNAUTHORIZED).json({
                error: "Missing session id"
            });
            return;
        }
        const session = await client_1.default.session.findUnique({
            where: {
                id: cookies.SESSION_ID
            },
            select: {
                expiration: true,
                userId: true
            }
        });
        if (!session) {
            logger_1.default.error("Invalid session id");
            res.status(constants_1.HttpStatus.UNAUTHORIZED).json({
                error: "Invalid session id"
            });
            return;
        }
        if (session.expiration <= new Date()) {
            logger_1.default.error("Session expired");
            res.status(constants_1.HttpStatus.UNAUTHORIZED).json({
                error: "Your session has been expired"
            });
            return;
        }
        req.userId = session.userId;
        next();
    }
    catch (error) {
        res.status(constants_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: (error instanceof Error) ? error.message : "Internal server error"
        });
    }
}
async function jwtAuthMiddleware(req, res, next) {
    try {
        const endpoint = req.path;
        logger_1.default.info({ endpoint });
        const excluded = ["/api/v1/auth/register", "/api/v1/auth/login", "/api/v1/auth/refresh-token"];
        if (excluded.includes(endpoint)) {
            next();
            return;
        }
        const { authorization } = req.headers;
        if (!authorization) {
            logger_1.default.error("Authorization header is missing");
            res.status(constants_1.HttpStatus.UNAUTHORIZED).json({
                error: "Authorization header is missing"
            });
            return;
        }
        const token = authorization.substring(constants_1.AUTHORIZATION_PREFIX.length);
        if (!token) {
            logger_1.default.error("Token is missing");
            res.status(constants_1.HttpStatus.UNAUTHORIZED).json({
                error: "Token is missing"
            });
            return;
        }
        const payload = jwt_1.JWT.decode(token, variables_1.JWT_SECRET_KEY);
        req.userId = payload.userId;
        next();
    }
    catch (error) {
        res.status(constants_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: (error instanceof Error) ? error.message : "Internal server error"
        });
    }
}
