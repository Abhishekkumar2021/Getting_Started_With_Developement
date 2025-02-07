import { Router } from "express";
import { addExpense, getAllExpenses, deleteExpense, updateExpense, getExpense } from "../controllers/expense.controllers.js";
const router = Router();
router.post("/", addExpense);
router.get("/", getAllExpenses);
router.get("/:id", getExpense);
router.delete("/:id", deleteExpense);
router.patch("/:id", updateExpense);
export default router;
