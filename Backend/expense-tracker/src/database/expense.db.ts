import { v4 as uuid } from "uuid"
import Expense from "../models/expense.model.js";
import { dateToString, stringToDate } from "../utility/date.utils.js";
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

    addExpense(amount: number, description: string, category: string, createdDate: string): string {
        // Generate an unique ID
        const id = uuid()

        if (!createdDate) {
            createdDate = dateToString(new Date());
        } else {
            createdDate = dateToString(new Date(createdDate))
        }

        // Create an expense object
        const expense = new Expense(id, description, category, amount, createdDate, dateToString(new Date()))

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
            if (expense.id === id) {
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

    totalExpense() {
        let total = 0;
        this.expenses.forEach((expense) => {
            total += expense.amount;
        })

        return total;
    }

    expenseOfAllMonths(){
        const expenses: { [key: number]: number } = {}

        for (const expense of this.expenses) {
            const month = stringToDate(expense.created).getMonth() + 1
            if (!expenses[month]) expenses[month] = 0
            expenses[month] += expense.amount;
        }

        return expenses;
    }

    expenseOfMonth(month: string){
        let total = 0;
        for (const expense of this.expenses) {
            const expenseMonth = stringToDate(expense.created).getMonth() + 1;
            if (expenseMonth === parseInt(month)) total += expense.amount;
        }
        return total
    }

    expenseOfAllYears() {
        const expenses: { [key: number]: number } = {}

        for (const expense of this.expenses) {
            const year = stringToDate(expense.created).getFullYear()

            if (!expenses[year]) expenses[year] = 0;

            expenses[year] += expense.amount
        }

        return expenses
    }


    expenseOfYear(year: string){
        let total = 0;

        for(const expense of this.expenses){
            const expenseYear = stringToDate(expense.created).getFullYear()

            if(expenseYear === parseInt(year)) total += expense.amount
        }

        return total
    }

    expenseByCategories(){
        const expenses: {[key: string]: number} = {}

        for(const expense of this.expenses){

            if(!expenses[expense.category]) expenses[expense.category] = 0;
            expenses[expense.category] += expense.amount
        }

        return expenses
    }

    expenseOfCategory(category: string){
        let total = 0;

        for(const expense of this.expenses){
            if(expense.category === category) total += expense.amount
        }

        return total
    }


    expenseByRange(from: string, to: string){
        const fromDate = stringToDate(from)
        const toDate = stringToDate(to)

        if(fromDate > toDate) return 0

        let total = 0
        for(const expense of this.expenses){
            const date = stringToDate(expense.created)
            if(date >= fromDate && date <= toDate) total += expense.amount
        }

        return total
    }
}

export default ExpenseDatabase;
