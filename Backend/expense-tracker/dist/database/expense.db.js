import { v4 as uuid } from "uuid";
import Expense from "../models/expense.model.js";
import { dateToString, stringToDate } from "../utility/date.utils.js";
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
    addExpense(amount, description, category, createdDate) {
        const id = uuid();
        if (!createdDate) {
            createdDate = dateToString(new Date());
        }
        else {
            createdDate = dateToString(new Date(createdDate));
        }
        const expense = new Expense(id, description, category, amount, createdDate, dateToString(new Date()));
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
    totalExpense() {
        let total = 0;
        this.expenses.forEach((expense) => {
            total += expense.amount;
        });
        return total;
    }
    expenseOfAllMonths() {
        const expenses = {};
        for (const expense of this.expenses) {
            const month = stringToDate(expense.created).getMonth() + 1;
            if (!expenses[month])
                expenses[month] = 0;
            expenses[month] += expense.amount;
        }
        return expenses;
    }
    expenseOfMonth(month) {
        let total = 0;
        for (const expense of this.expenses) {
            const expenseMonth = stringToDate(expense.created).getMonth() + 1;
            if (expenseMonth === parseInt(month))
                total += expense.amount;
        }
        return total;
    }
    expenseOfAllYears() {
        const expenses = {};
        for (const expense of this.expenses) {
            const year = stringToDate(expense.created).getFullYear();
            if (!expenses[year])
                expenses[year] = 0;
            expenses[year] += expense.amount;
        }
        return expenses;
    }
    expenseOfYear(year) {
        let total = 0;
        for (const expense of this.expenses) {
            const expenseYear = stringToDate(expense.created).getFullYear();
            if (expenseYear === parseInt(year))
                total += expense.amount;
        }
        return total;
    }
    expenseByCategories() {
        const expenses = {};
        for (const expense of this.expenses) {
            if (!expenses[expense.category])
                expenses[expense.category] = 0;
            expenses[expense.category] += expense.amount;
        }
        return expenses;
    }
    expenseOfCategory(category) {
        let total = 0;
        for (const expense of this.expenses) {
            if (expense.category === category)
                total += expense.amount;
        }
        return total;
    }
    expenseByRange(from, to) {
        const fromDate = stringToDate(from);
        const toDate = stringToDate(to);
        if (fromDate > toDate)
            return 0;
        let total = 0;
        for (const expense of this.expenses) {
            const date = stringToDate(expense.created);
            if (date >= fromDate && date <= toDate)
                total += expense.amount;
        }
        return total;
    }
}
export default ExpenseDatabase;
