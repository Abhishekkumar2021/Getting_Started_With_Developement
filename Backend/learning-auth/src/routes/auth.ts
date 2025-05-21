import { Router } from "express";
import { loginUser, registerUser, refreshAccesToken } from "../controllers/auth";

const authRouter = Router()

// register
authRouter.post("/register", registerUser)

// login
authRouter.post("/login", loginUser)

// refresh access token
authRouter.post("/refresh-token", refreshAccesToken)

export default authRouter