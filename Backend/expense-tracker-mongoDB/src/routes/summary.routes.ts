import { Router } from "express";
import { expenseOfAllMonths, totalExpense, expenseOfMonth, expenseOfAllYears, expenseOfYear, expenseByCategories, expenseOfCategory, expenseByRange } from "../controllers/expense.controllers.js";

const router = Router();

router.get("/", totalExpense)

router.get("/months", expenseOfAllMonths)

router.get("/months/:month", expenseOfMonth)

router.get("/years", expenseOfAllYears)

router.get("/years/:year", expenseOfYear)

router.get("/categories", expenseByCategories)

router.get("/categories/:category", expenseOfCategory)

router.get("/range", expenseByRange)

export default router