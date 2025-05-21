"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.refreshAccesToken = refreshAccesToken;
const validators_1 = require("../utility/validators");
const zod_1 = require("zod");
const constants_1 = require("../common/constants");
const formatter_1 = require("../utility/formatter");
const client_1 = __importDefault(require("../db/client"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_1 = __importDefault(require("../config/logger"));
const variables_1 = require("../config/variables");
const jwt_1 = require("../utility/jwt");
async function registerUser(req, res) {
    const user = req.body;
    try {
        // Validate the user
        const validatedUser = validators_1.userSchema.parse(user ?? {});
        logger_1.default.info("Validated the user data");
        // Check if any user exists with same username or email
        const foundUser = await client_1.default.user.findFirst({
            where: {
                OR: [
                    { email: validatedUser.email },
                    { username: validatedUser.username }
                ]
            },
            select: {
                id: true
            }
        });
        if (foundUser) {
            logger_1.default.error("User already exist in DB");
            res.status(constants_1.HttpStatus.CONFLICT).json({
                error: "User with same email or username alredy exist."
            });
            return;
        }
        // Create an ID
        const userId = (0, uuid_1.v4)();
        // Hash the password
        const hashedPassword = await bcrypt_1.default.hash(validatedUser.password, 10);
        // Save into DB
        const savedUser = await client_1.default.user.create({
            data: {
                id: userId,
                ...validatedUser,
                password: hashedPassword
            },
            omit: {
                password: true
            }
        });
        logger_1.default.info("User data saved to DB");
        res.status(constants_1.HttpStatus.CREATED).json({
            message: "Successfully registered the user.",
            user: savedUser
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            logger_1.default.error("Validation error occured on user data");
            res.status(constants_1.HttpStatus.BAD_REQUEST).json({
                error: (0, formatter_1.formatZodError)(error)
            });
            return;
        }
        logger_1.default.error("An unexpected error occured");
        res.status(constants_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: error instanceof Error ? error.message : "Something went wrong"
        });
    }
}
async function loginUser(req, res) {
    const credentails = req.body;
    try {
        if (!credentails.username) {
            logger_1.default.error("Username is missing");
            res.status(constants_1.HttpStatus.BAD_REQUEST).json({
                error: "Atleast one of email or username is required"
            });
            return;
        }
        if (!credentails.password) {
            logger_1.default.error("Password is missing");
            res.status(constants_1.HttpStatus.BAD_REQUEST).json({
                error: "Password is required"
            });
            return;
        }
        // Check if any such user exists in DB
        const foundUser = await client_1.default.user.findFirst({
            where: {
                OR: [
                    { username: credentails.username },
                    { email: credentails.username }
                ]
            },
            select: {
                password: true,
                id: true
            }
        });
        if (!foundUser) {
            logger_1.default.info("No such user found in DB");
            res.status(constants_1.HttpStatus.BAD_REQUEST).json({
                error: "Invalid username or email"
            });
            return;
        }
        // Verify the password
        const isMatched = await bcrypt_1.default.compare(credentails.password, foundUser.password);
        if (!isMatched) {
            logger_1.default.info("Invalid password");
            res.status(constants_1.HttpStatus.BAD_REQUEST).json({
                error: "Wrong password"
            });
            return;
        }
        // Generate session id
        if (parseInt(variables_1.AUTH_JWT) == 0) {
            await createSession(foundUser, res);
            res.status(constants_1.HttpStatus.OK).json({
                message: "Successfully logged in"
            });
            return;
        }
        const tokens = generateTokens(foundUser, res);
        res.status(constants_1.HttpStatus.OK).json({
            message: "Succesfully logged in",
            tokens
        });
    }
    catch (error) {
        res.status(constants_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: (error instanceof Error) ? error.message : "Internal server error"
        });
    }
}
async function refreshAccesToken(req, res) {
    try {
        const { refreshToken } = req.body;
        const decodedRefreshTokenPayload = jwt_1.JWT.decode(refreshToken, variables_1.JWT_SECRET_KEY);
        const accessTokenExp = parseInt(variables_1.ACCESS_TOKEN_EXPIRATION) * 1000;
        const accessToken = jwt_1.JWT.encode({ userId: decodedRefreshTokenPayload.userId }, variables_1.JWT_SECRET_KEY, accessTokenExp);
        res.status(constants_1.HttpStatus.OK).json({
            message: "Token refreshed succesfully",
            accessToken
        });
    }
    catch (error) {
        res.status(constants_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: (error instanceof Error) ? error.message : "Internal server error"
        });
    }
}
async function createSession(foundUser, res) {
    const sessionId = (0, uuid_1.v4)();
    const expirationMs = Date.now() + parseInt(variables_1.SESSION_EXPIRATION) * 1000;
    const session = await client_1.default.session.create({
        data: {
            id: sessionId,
            userId: foundUser.id,
            expiration: new Date(expirationMs)
        },
        select: {
            id: true
        }
    });
    // Send the session id to browser in from of cookie
    res.cookie("SESSION_ID", session.id, {
        expires: new Date(expirationMs),
        httpOnly: true
    });
    logger_1.default.info("Session Id cookie placed");
}
function generateTokens(foundUser, res) {
    // Acces token, refresh token
    const payload = {
        userId: foundUser.id
    };
    const accessTokenExp = parseInt(variables_1.ACCESS_TOKEN_EXPIRATION) * 1000;
    const refreshTokenExp = parseInt(variables_1.REFRESH_TOKEN_EXPIRATION) * 1000;
    return {
        accessToken: jwt_1.JWT.encode(payload, variables_1.JWT_SECRET_KEY, accessTokenExp),
        refreshToken: jwt_1.JWT.encode(payload, variables_1.JWT_SECRET_KEY, refreshTokenExp)
    };
}
