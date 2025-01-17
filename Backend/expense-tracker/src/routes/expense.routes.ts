import { Router } from "express";
import { addExpense, getAllExpenses, deleteExpense, updateExpense, getExpense } from "../controllers/expense.controllers.js";

const router = Router();

// POST /expenses
router.post("/", addExpense)

// GET /expenses
router.get("/", getAllExpenses)

// GET /expenses/:id
router.get("/:id", getExpense)

// DELETE /expenses/:id
router.delete("/:id", deleteExpense)

// PATCH /expenses/:id
router.patch("/:id", updateExpense)

export default router