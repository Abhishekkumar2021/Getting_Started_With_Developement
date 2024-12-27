#! /usr/bin/env node

import { Command, Option, Argument } from "commander";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { table } from "table"
import chalk from 'chalk';

class Expense {
  constructor(id, amount, description, category, date) {
    this.amount = amount;
    this.description = description;
    this.category = category;
    this.id = id;
    this.date = date;
  }
}

let CURRENT_ID = 1;

class ExpenseTracker {
  constructor() {
    this.expenses = [];
    this.loadExpenses();
  }

  getMonthNumber(month) {
    switch (month) {
      case "Jan": return 0;
      case "Feb": return 1;
      case "Mar": return 2;
      case "Apr": return 3;
      case "May": return 4;
      case "Jun": return 5;
      case "Jul": return 6;
      case "Aug": return 7;
      case "Sep": return 8;
      case "Oct": return 9;
      case "Nov": return 10;
      case "Dec": return 11;
    }
  }

  loadExpenses() {
    try {
      // Check if file exists
      if (!existsSync("expenses.json")) {
        writeFileSync("expenses.json", "");
        return;
      }

      const data = readFileSync("expenses.json");
      if (data.length === 0) return;

      this.expenses = JSON.parse(data);

      for (let expense of this.expenses) {
        if (expense.id >= CURRENT_ID) {
          CURRENT_ID = expense.id + 1;
        }
        expense.date = new Date(expense.date);
      }
    } catch (e) {
      console.log(chalk.redBright("Error loading expenses!"), e);
      process.exit(1);
    }
  }

  writeExpenses() {
    try {
      for (let expense of this.expenses) {
        expense.date = this.dateToString(expense.date);
      }
      const data = JSON.stringify(this.expenses);
      writeFileSync("expenses.json", data);
    } catch (_) {
      console.log(chalk.redBright("Error writing expenses!"));
      process.exit(1);
    }
  }

  addExpense(expense) {
    this.expenses.push(expense);
    this.writeExpenses();
  }

  dateToString(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  listExpenses() {
    const data = []
    if (this.expenses.length === 0) {
      console.log(chalk.yellowBright("No expenses found!"));
      return;
    }

    // Add header
    data.push(["ID", "Amount", "Category", "Date", "Description"]);

    for (let expense of this.expenses) {
      data.push([expense.id, expense.amount, expense.category, this.dateToString(expense.date), expense.description]);
    }

    const output = table(data);
    console.log(chalk.greenBright(output));
  }

  deleteExpense(id) {
    this.expenses = this.expenses.filter(expense => expense.id !== id);
    this.writeExpenses();
  }

  updateExpense(id, amount, description, category) {
    let idx = this.expenses.findIndex(expense => expense.id === id);
    if (idx === -1) {
      console.log("Expense not found!");
      return;
    }
    if (amount) this.expenses[idx].amount = amount;
    if (description) this.expenses[idx].description = description;
    if (category) this.expenses[idx].category = category;

    this.writeExpenses();
  }

  summaryByDate(from, to) {
    let total = 0;
    for (let expense of this.expenses) {
      if (expense.date >= from && expense.date <= to) {
        total += expense.amount;
      }
    }
    console.log(`Total expenses from ${chalk.yellowBright(this.dateToString(from))} to ${chalk.yellowBright(this.dateToString(to))}: ${chalk.greenBright(total)}`);
  }

  summaryByMonth(month) {
    let total = 0;
    for (let expense of this.expenses) {
      if (expense.date.getMonth() === this.getMonthNumber(month)) {
        total += expense.amount;
      }
    }
    console.log(`Total expenses for ${chalk.yellowBright(month)}: ${chalk.greenBright(total)}`);
  }

  summaryByCategory(category) {
    let total = 0;
    for (let expense of this.expenses) {
      if (expense.category === category) {
        total += expense.amount;
      }
    }
    console.log(`Total expenses for ${chalk.yellowBright(category)}: ${chalk.greenBright(total)}`);
  }

  summary() {
    let total = 0;
    for (let expense of this.expenses) {
      total += expense.amount;
    }
    console.log(`Total expenses: ${chalk.greenBright(total)}`);
  }
}

function checkDateFormat(dateString) {
  const dateParts = dateString.split("-");
  if (dateParts.length !== 3) return false;
  if (dateParts[0].length !== 4) return false;
  if (dateParts[1].length > 2 || dateParts[1].length < 1) return false;
  if (dateParts[2].length > 2 || dateParts[2].length < 1) return false;
  return true;
}
const command = new Command();

command
  .addArgument(new Argument("<command>" , "The main command that the expense-tracker will run.").choices(["add", "list", "delete", "update", "summary"]))
  .addOption(new Option("-a, --amount <amount>", "The amount of the expense.").argParser(parseFloat))
  .addOption(new Option("-d, --description <description>", "The description of the expense."))
  .addOption(new Option("-c, --category <category>", "The category of the expense.").choices(["Food", "Transport", "Entertainment", "Other"]))
  .addOption(new Option("-i, --id <id>", "The id of the expense."))
  .addOption(new Option("-f, --from <from>", "The start date of the summary."))
  .addOption(new Option("-t, --to <to>", "The end date of the summary."))
  .addOption(new Option("-m --month <month>", "The month of the summary.").choices(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]))
  .addOption(new Option("-dt, --date <date>", "The date of the expense."));

command.parse(process.argv);
const options = command.opts();
const args = command.args;

const tracker = new ExpenseTracker();
const instruction = args[0];

switch (instruction) {
  case "add": {
    if (!options.amount) {
      console.log(chalk.redBright("Amount is required!"));
      process.exit(1);
    }

    if (options.amount <= 0) {
      console.log("Amount must be greater than 0!");
      process.exit(1);
    }

    if (options.date && !checkDateFormat(options.date)) {
      console.log(chalk.redBright("Invalid date format! Use YYYY-MM-DD."));
      process.exit(1);
    }

    const expense = new Expense(CURRENT_ID++, options.amount, (options.description || "No description provided!"), (options.category || "Other"), (options.date ? new Date(options.date) : new Date()));
    tracker.addExpense(expense);
    break;
  }
  case "list": {
    tracker.listExpenses();
    break;
  }
  case "delete": {
    if (!options.id) {
      console.log(chalk.redBright("ID is required!"));
      process.exit(1);
    }

    tracker.deleteExpense(options.id);
    break;
  }
  case "update": {
    if (!options.id) {
      console.log(chalk.redBright("ID is required!"));
      process.exit(1);
    }

    if (!options.amount && !options.description && !options.category) {
      console.log(chalk.redBright("At least one of amount, description, or category is required!"));
      process.exit(1);
    }

    tracker.updateExpense(options.id, options.amount, options.description, options.category);
    break;
  }
  case "summary": {
    if (options.from && options.to) {
      if (!checkDateFormat(options.from) || !checkDateFormat(options.to)) {
        console.log(chalk.redBright("Invalid date format! Use YYYY-MM-DD."));
        process.exit(1);
      }

      if (new Date(options.from) > new Date(options.to)) {
        console.log(chalk.redBright("From date must be before to date!"));
        process.exit(1);
      }

      tracker.summaryByDate(new Date(options.from), new Date(options.to));
    } else if (options.month) {
      tracker.summaryByMonth(options.month);
    } else if (options.category) {
      tracker.summaryByCategory(options.category);
    } else {
      tracker.summary();
    }
    break;
  }
}


