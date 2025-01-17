import { v4 as uuid } from "uuid";
import Expense from "../models/expense.model.js";
import { dateToString } from "../utility/date.utils.js";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
class ExpenseDatabase {
    FILE_PATH;
    expenses;
    constructor(FILE_PATH = "src/database/expense.db.json", expenses = []) {
        this.FILE_PATH = FILE_PATH;
        this.expenses = expenses;
        this.readExpensesFromFile();
    }
    readExpensesFromFile() {
        try {
            if (!existsSync(this.FILE_PATH)) {
                writeFileSync(this.FILE_PATH, "");
                return;
            }
            const data = readFileSync(this.FILE_PATH);
            if (data.length === 0)
                return;
            this.expenses = JSON.parse(data.toString());
        }
        catch (e) {
            console.log("Error loading expenses!");
        }
    }
    writeExpensesToFile() {
        try {
            const data = JSON.stringify(this.expenses);
            writeFileSync(this.FILE_PATH, data);
        }
        catch (_) {
            console.log("Error writing expenses!");
        }
    }
    addExpense(amount, description, category) {
        const id = uuid();
        const expense = new Expense(id, description, category, amount, dateToString(new Date()), dateToString(new Date()));
        this.expenses.push(expense);
        this.writeExpensesToFile();
        return id;
    }
    getAllExpenses() {
        return this.expenses;
    }
    deleteExpense(id) {
        let isFound = false;
        this.expenses = this.expenses.filter((expense) => {
            if (expense.id === id) {
                isFound = true;
            }
            return expense.id !== id;
        });
        this.writeExpensesToFile();
        return isFound;
    }
    updateExpense(id, description, category, amount) {
        const idx = this.expenses.findIndex((expense) => {
            return expense.id === id;
        });
        const newData = {
            description,
            category,
            amount,
            updated: dateToString(new Date()),
        };
        this.expenses[idx] = {
            ...this.expenses[idx],
            ...newData,
        };
        return idx !== -1;
    }
    getExpense(id) {
        return this.expenses.find((expense) => {
            return expense.id === id;
        });
    }
}
export default ExpenseDatabase;
