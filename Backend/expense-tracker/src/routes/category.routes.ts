import { Router } from "express";
import { addCategory, getCategories } from "../controllers/catgory.controllers.js";

const router = Router();

router.get("/", getCategories)

router.post("/", addCategory)

export default router;