import ErrorResponse from "../utility/error-response.model.js";
import SuccessResponse from "../utility/success-response.model.js";
import ExpenseDatabase from "../database/expense.db.js";
const expenseDb = new ExpenseDatabase();
export function addExpense(req, res) {
    try {
        let { description, category, amount, created } = req.body;
        if (!amount) {
            res.status(400).json(new ErrorResponse("The amount field is required!", 400));
            return;
        }
        if (amount < 0) {
            res.status(400).json(new ErrorResponse("The amount field must be positive!", 400));
            return;
        }
        if (!category) {
            category = "OTHERS";
        }
        if (!description) {
            description = "No description provided!";
        }
        const id = expenseDb.addExpense(amount, description, category, created);
        res.status(201).json(new SuccessResponse(id, 201, "Succesfully added the expense!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function getAllExpenses(_, res) {
    try {
        const expenses = expenseDb.getAllExpenses();
        res.status(200).json(new SuccessResponse(expenses, 200, "Succesfully fetched all expenses!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function deleteExpense(req, res) {
    try {
        const { id } = req.params;
        const isFound = expenseDb.deleteExpense(id);
        if (!isFound) {
            res.status(404).json(new ErrorResponse("No expense exist with the given ID!", 404));
            return;
        }
        res.status(200).json(new SuccessResponse(null, 200, "Succesfully deleted the expense!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function updateExpense(req, res) {
    try {
        const { id } = req.params;
        const { description, category, amount } = req.body;
        const isFound = expenseDb.updateExpense(id, description, category, amount);
        if (!isFound) {
            res.status(404).json(new ErrorResponse("No expense exist with the given ID!", 404));
            return;
        }
        res.status(200).json(new SuccessResponse(id, 200, "Succesfully updated the expense!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function getExpense(req, res) {
    try {
        const { id } = req.params;
        const expense = expenseDb.getExpense(id);
        if (!expense) {
            res.status(404).json(new ErrorResponse("No expense exist with the given ID!", 404));
            return;
        }
        res.status(200).json(new SuccessResponse(expense, 200, "Succesfully fetched the expense!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function totalExpense(req, res) {
    try {
        const value = expenseDb.totalExpense();
        res.status(200).json(new SuccessResponse(value, 200, "Successfully fetched total expense!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function expenseOfAllMonths(_, res) {
    try {
        const value = expenseDb.expenseOfAllMonths();
        res.status(200).json(new SuccessResponse(value, 200, "Successfully fetched total expense of all months!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function expenseOfMonth(req, res) {
    try {
        const { month } = req.params;
        const value = expenseDb.expenseOfMonth(month);
        res.status(200).json(new SuccessResponse(value, 200, "Successfully fetched total expense of the month!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function expenseOfAllYears(_, res) {
    try {
        const value = expenseDb.expenseOfAllYears();
        res.status(200).json(new SuccessResponse(value, 200, "Successfully fetched total expense of all years!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function expenseOfYear(req, res) {
    try {
        const { year } = req.params;
        const value = expenseDb.expenseOfYear(year);
        res.status(200).json(new SuccessResponse(value, 200, "Successfully fetch year expense!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function expenseByCategories(req, res) {
    try {
        const value = expenseDb.expenseByCategories();
        res.status(200).json(new SuccessResponse(value, 200, "Successfully fetched all categories expense!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function expenseOfCategory(req, res) {
    try {
        const { category } = req.params;
        const value = expenseDb.expenseOfCategory(category);
        res.status(200).json(new SuccessResponse(value, 200, "Successfully fetched category expense!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function expenseByRange(req, res) {
    try {
        const { from, to } = req.query;
        if (!from || !to) {
            res.status(400).json(new ErrorResponse(`Both "from" and "to" are required!`, 400));
            return;
        }
        const value = expenseDb.expenseByRange(from, to);
        res.status(200).json(new SuccessResponse(value, 200, "Successfully fetched range expense!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
