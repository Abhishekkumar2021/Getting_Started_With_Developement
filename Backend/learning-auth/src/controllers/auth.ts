import { Request, Response } from "express"
import { userSchema } from "../utility/validators"
import { ZodError } from "zod"
import { HttpStatus } from "../common/constants"
import { formatZodError } from "../utility/formatter"
import client from "../db/client"
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import logger from "../config/logger"
import { LoginPayload, RegisterPayload } from "../types/auth"
import { cli } from "winston/lib/winston/config"
import { ACCESS_TOKEN_EXPIRATION, AUTH_JWT, JWT_SECRET_KEY, REFRESH_TOKEN_EXPIRATION, SESSION_EXPIRATION } from "../config/variables"
import { JWT } from "../utility/jwt"

export async function registerUser(req: Request, res: Response) {
    const user: RegisterPayload = req.body

    try {
        // Validate the user
        const validatedUser = userSchema.parse(user ?? {})
        logger.info("Validated the user data")

        // Check if any user exists with same username or email
        const foundUser = await client.user.findFirst({
            where: {
                OR: [
                    { email: validatedUser.email },
                    { username: validatedUser.username }
                ]
            },
            select: {
                id: true
            }
        })

        if (foundUser) {
            logger.error("User already exist in DB")
            res.status(HttpStatus.CONFLICT).json({
                error: "User with same email or username alredy exist."
            })
            return;
        }

        // Create an ID
        const userId = uuidv4();

        // Hash the password
        const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

        // Save into DB
        const savedUser = await client.user.create({
            data: {
                id: userId,
                ...validatedUser,
                password: hashedPassword
            },
            omit: {
                password: true
            }
        })

        logger.info("User data saved to DB")

        res.status(HttpStatus.CREATED).json({
            message: "Successfully registered the user.",
            user: savedUser
        })
    } catch (error) {
        if (error instanceof ZodError) {
            logger.error("Validation error occured on user data")
            res.status(HttpStatus.BAD_REQUEST).json({
                error: formatZodError(error)
            })
            return;
        }
        logger.error("An unexpected error occured")
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: error instanceof Error ? error.message : "Something went wrong"
        })

    }
}

export async function loginUser(req: Request, res: Response) {
    const credentails: LoginPayload = req.body

    try {
        if (!credentails.username) {
            logger.error("Username is missing")

            res.status(HttpStatus.BAD_REQUEST).json({
                error: "Atleast one of email or username is required"
            })
            return;
        }

        if (!credentails.password) {
            logger.error("Password is missing")

            res.status(HttpStatus.BAD_REQUEST).json({
                error: "Password is required"
            })
            return;
        }

        // Check if any such user exists in DB
        const foundUser = await client.user.findFirst({
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
        })

        if (!foundUser) {
            logger.info("No such user found in DB")
            res.status(HttpStatus.BAD_REQUEST).json({
                error: "Invalid username or email"
            })
            return
        }

        // Verify the password
        const isMatched = await bcrypt.compare(credentails.password, foundUser.password)
        if (!isMatched) {
            logger.info("Invalid password")
            res.status(HttpStatus.BAD_REQUEST).json({
                error: "Wrong password"
            })
            return
        }

        // Generate session id
        if (parseInt(AUTH_JWT as string) == 0) {
            await createSession(foundUser, res)
            res.status(HttpStatus.OK).json({
                message: "Successfully logged in"
            })
            return
        }

        const tokens = generateTokens(foundUser, res)
        res.status(HttpStatus.OK).json({
            message: "Succesfully logged in",
            tokens
        })
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: (error instanceof Error) ? error.message : "Internal server error"
        })
    }
}

export async function refreshAccesToken(req: Request, res: Response) {
    try {
        const { refreshToken } = req.body

        const decodedRefreshTokenPayload = JWT.decode(refreshToken, JWT_SECRET_KEY!)

        const accessTokenExp = parseInt(ACCESS_TOKEN_EXPIRATION as string) * 1000
        const accessToken = JWT.encode({userId: decodedRefreshTokenPayload.userId}, JWT_SECRET_KEY!, accessTokenExp)

        res.status(HttpStatus.OK).json({
            message: "Token refreshed succesfully",
            accessToken
        })
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: (error instanceof Error) ? error.message : "Internal server error"
        })
    }
}

async function createSession(foundUser: { id: string; password: string }, res: Response<any, Record<string, any>>) {
    const sessionId = uuidv4()

    const expirationMs = Date.now() + parseInt(SESSION_EXPIRATION as string) * 1000

    const session = await client.session.create({
        data: {
            id: sessionId,
            userId: foundUser.id,
            expiration: new Date(expirationMs)
        },
        select: {
            id: true
        }
    })

    // Send the session id to browser in from of cookie
    res.cookie("SESSION_ID", session.id, {
        expires: new Date(expirationMs),
        httpOnly: true
    })
    logger.info("Session Id cookie placed")
}

function generateTokens(foundUser: { id: string; password: string }, res: Response<any, Record<string, any>>) {
    // Acces token, refresh token
    const payload = {
        userId: foundUser.id
    }

    const accessTokenExp = parseInt(ACCESS_TOKEN_EXPIRATION as string) * 1000
    const refreshTokenExp = parseInt(REFRESH_TOKEN_EXPIRATION as string) * 1000

    return {
        accessToken: JWT.encode(payload, JWT_SECRET_KEY!, accessTokenExp),
        refreshToken: JWT.encode(payload, JWT_SECRET_KEY!, refreshTokenExp)
    }
}

