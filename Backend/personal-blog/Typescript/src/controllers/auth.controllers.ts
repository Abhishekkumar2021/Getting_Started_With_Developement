import { Request, Response } from "express";
import { UserDatabase } from "../db/user.db.js";
import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import { getToken } from "../utils/token.utlis.js";

const userDb = new UserDatabase()
export function login(req: Request, res: Response) {
    const { username, password } = req.body

    if(!password || !username){
        res.status(StatusCodes.BAD_REQUEST)
        res.json({
            message: "Missing one or more out of password, username!"
        })
        return
    }

    const foundUser = userDb.getUserByUsername(username)

    if(!foundUser){
        res.status(StatusCodes.BAD_REQUEST)
        res.json({
            message: "Invalid username provided!"
        })
        return
    }

    if(foundUser.password !== password){
        res.status(StatusCodes.BAD_REQUEST)
        res.json({
            message: "Invalid password provided!"
        })
        return
    }

    const token = getToken(foundUser)

    res.status(StatusCodes.OK)
    res.json({
        message: "Sucessfully logged in!",
        data: token
    })
}
export function signUp(req: Request, res: Response) {
    const { email, password, name, username } = req.body

    if(!email || !password || !username){
        res.status(StatusCodes.BAD_REQUEST)
        res.json({
            message: "Missing one or more out of email, password, and username!"
        })
        return
    }

    const foundUser = userDb.getUserByUsername(username)
    if(foundUser){
        res.status(StatusCodes.BAD_REQUEST)
        res.json({
            message: "Username already exists, Please try different one!"
        })
        return
    }
    let maxId = userDb.getMaxId()

    // Add new user to the array
    const newUser: User = {
        id: maxId + 1,
        email,
        password,
        name,
        username,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    userDb.createUser(newUser)
    res.status(StatusCodes.CREATED)
    res.json({
        message: "Successfully created the user",
        data: newUser
    })
}


