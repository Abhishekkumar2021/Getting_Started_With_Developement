import { Router } from "express";
import { getCurrentUser } from "../controllers/sensitive";

const sensitiveRouter = Router()

sensitiveRouter.get("/me", getCurrentUser)

export default sensitiveRouter