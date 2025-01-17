import { Request, Response } from "express"
import ErrorResponse from "../utility/error-response.model.js"
import SuccessResponse from "../utility/success-response.model.js";
import ExpenseDatabase from "../database/expense.db.js";

const expenseDb = new ExpenseDatabase();

// Controller
export function addExpense(req: Request, res: Response) {
    try {
        let { description, category, amount } = req.body

        // Validation
        if (!amount) {
            res.status(400).json(new ErrorResponse("The amount field is required!", 400))
            return;
        }

        if (amount < 0) {
            res.status(400).json(new ErrorResponse("The amount field must be positive!", 400))
            return;
        }

        if (!category) {
            category = "OTHERS"
        }

        if (!description) {
            description = "No description provided!"
        }

        // Call database to add this expense
        const id = expenseDb.addExpense(amount, description, category)

        res.status(201).json(new SuccessResponse(id, 201, "Succesfully added the expense!"))
    } catch (error) {
        console.log(error)
        res.status(500).json(new ErrorResponse("Something went wrong!", 500))
    }
}

export function getAllExpenses(_: Request, res: Response) {
    try {
        const expenses = expenseDb.getAllExpenses()
        res.status(200).json(new SuccessResponse(expenses, 200, "Succesfully fetched all expenses!"))
    } catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500))
    }
}

export function deleteExpense(req: Request, res: Response) {
    try {
        const { id } = req.params

        const isFound = expenseDb.deleteExpense(id)

        if (!isFound) {
            res.status(404).json(new ErrorResponse("No expense exist with the given ID!", 404))
            return;
        }

        res.status(200).json(new SuccessResponse(null, 200, "Succesfully deleted the expense!"))
    } catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500))
    }
}

export function updateExpense(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { description, category, amount } = req.body

        const isFound = expenseDb.updateExpense(id, description, category, amount)

        if (!isFound) {
            res.status(404).json(new ErrorResponse("No expense exist with the given ID!", 404))
            return;
        }

        res.status(200).json(new SuccessResponse(id, 200, "Succesfully updated the expense!"))
    } catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500))
    }
}

export function getExpense(req: Request, res: Response) {
    try {
        const { id } = req.params

        const expense = expenseDb.getExpense(id)

        if (!expense) {
            res.status(404).json(new ErrorResponse("No expense exist with the given ID!", 404))
            return;
        }

        res.status(200).json(new SuccessResponse(expense, 200, "Succesfully fetched the expense!"))
    } catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500))
    }
}