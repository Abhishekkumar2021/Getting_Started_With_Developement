import { Request, Response } from "express"
import client from "../db/client";
import { HttpStatus } from "../common/constants";
export async function getCurrentUser(req: Request, res: Response){
    const userId = req.userId;

    const user = await client.user.findFirst({
        where: {
            id: userId
        },
        omit: {
            password: true
        }
    })

    res.status(HttpStatus.OK).json({
        message: "User fetched succesfully",
        user: user
    })
}