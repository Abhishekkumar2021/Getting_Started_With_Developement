import ErrorResponse from "../utility/error-response.model.js";
import SuccessResponse from "../utility/success-response.model.js";
import { add_expense, delete_Expense, expense_by_categories, expense_of_all_months, expense_of_all_years, expense_of_category, expense_of_month, expense_of_range, expense_of_year, get_all_expenses, get_expense_by_ID, total_expense, update_expense, } from "../database/expense.db.js";
import { ObjectId } from "mongodb";
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
        const id = add_expense(amount, description, category, created);
        res.status(201).json(new SuccessResponse(id, 201, "Succesfully added the expense!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function getAllExpenses(_, res) {
    try {
        const expenses = get_all_expenses();
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
        const ID = new ObjectId(id);
        const isFound = delete_Expense(ID);
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
        const ID = new ObjectId(id);
        const { description, category, amount } = req.body;
        const isFound = update_expense(ID, description, category, amount);
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
        const ID = new ObjectId(id);
        const expense = get_expense_by_ID(ID);
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
        const value = total_expense();
        res.status(200).json(new SuccessResponse(value, 200, "Successfully fetched total expense!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function expenseOfAllMonths(_, res) {
    try {
        const value = expense_of_all_months();
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
        const value = expense_of_month(month);
        res.status(200).json(new SuccessResponse(value, 200, "Successfully fetched total expense of the month!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function expenseOfAllYears(_, res) {
    try {
        const value = expense_of_all_years();
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
        const value = expense_of_year(year);
        res.status(200).json(new SuccessResponse(value, 200, "Successfully fetch year expense!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
export function expenseByCategories(req, res) {
    try {
        const value = expense_by_categories();
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
        const value = expense_of_category(category);
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
        const value = expense_of_range(from, to);
        res.status(200).json(new SuccessResponse(value, 200, "Successfully fetched range expense!"));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(new ErrorResponse("Something went wrong!", 500));
    }
}
