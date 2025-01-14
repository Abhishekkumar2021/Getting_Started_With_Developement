import {Router} from "express"
import { login, signUp } from "../controllers/auth.controllers.js"


const router = Router()

router.post("/auth/login", login)
router.post("/auth/signup", signUp)

export default router

