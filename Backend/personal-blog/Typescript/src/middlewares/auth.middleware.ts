import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { tokenValidation } from "../utils/token.utlis.js";

export default function authMiddleware(req: Request, res: Response, next: NextFunction){
    const {authorization} = req.headers

    if(!authorization){
        res.status(StatusCodes.UNAUTHORIZED)
        res.json({
            message: "Authorization header is missing!"
        })
        return
    }

    if(!authorization.startsWith("Bearer ")){
        res.status(StatusCodes.UNAUTHORIZED)
        res.json({
            message: "Invalid token format!"
        })
        return
    }

    const token = authorization.substring(7)

    if(!token){
        res.status(StatusCodes.UNAUTHORIZED)
        res.json({
            message: "Authorization token is missing!"
        })
        return
    }

    if(!tokenValidation(token)){
        res.status(StatusCodes.UNAUTHORIZED)
        res.json({
            message: "Expired or Invalid token!"
        })
        return 
    }

    next()
}