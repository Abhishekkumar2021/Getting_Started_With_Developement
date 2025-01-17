import { v4 as uuid } from "uuid"
import Expense from "../models/expense.model.js";
import { dateToString } from "../utility/date.utils.js";
import { existsSync, readFileSync, writeFileSync } from "node:fs"

class ExpenseDatabase {
    constructor(
        public FILE_PATH: string = "src/database/expense.db.json",
        public expenses: Expense[] = []
    ) {
        this.readExpensesFromFile();
    }

    readExpensesFromFile() {
        try {
            // Check if file exists
            if (!existsSync(this.FILE_PATH)) {
                writeFileSync(this.FILE_PATH, "");
                return;
            }

            const data = readFileSync(this.FILE_PATH);
            if (data.length === 0) return;

            this.expenses = JSON.parse(data.toString());
        } catch (e) {
            console.log("Error loading expenses!");
        }
    }

    writeExpensesToFile() {
        try {
            const data = JSON.stringify(this.expenses);
            writeFileSync(this.FILE_PATH, data);
        } catch (_) {
            console.log("Error writing expenses!");
        }
    }

    addExpense(amount: number, description: string, category: string): string {
        // Generate an unique ID
        const id = uuid()

        // Create an expense object
        const expense = new Expense(id, description, category, amount, dateToString(new Date()), dateToString(new Date()))

        // Updating expense in DB file
        this.expenses.push(expense)
        this.writeExpensesToFile()

        return id;
    }

    getAllExpenses(): Expense[] {
        return this.expenses;
    }

    deleteExpense(id: string): boolean {
        let isFound = false;

        this.expenses = this.expenses.filter((expense) => {
            if(expense.id === id) {
                isFound = true;
            }

            return expense.id !== id;
        })

        this.writeExpensesToFile()

        return isFound
    }

    updateExpense(id: string, description: string, category: string, amount: number): boolean {
        const idx = this.expenses.findIndex((expense) => {
            return expense.id === id;
        })

        const newData = {
            description,
            category,
            amount,
            updated: dateToString(new Date()),
        }

        this.expenses[idx] = {
            ...this.expenses[idx],
            ...newData,
        } as Expense;

        return idx !== -1
    }

    getExpense(id: string): Expense | undefined {
        return this.expenses.find((expense) => {
            return expense.id === id
        })
    }
}

export default ExpenseDatabase;
