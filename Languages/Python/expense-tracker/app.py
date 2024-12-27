#! /Users/abhishek/Dev/Akansha/Development/.venv/bin/python3

import json
import sys
import os
from datetime import datetime
from argparser import ArgParser, Option, Argument
from rich.console import Console
from rich.table import Table


class Expense:
    def __init__(
        self, id: int, amount: float, description: str, category: str, date: datetime
    ):
        self.id: int = id
        self.amount: float = amount
        self.description: str = description
        self.category: str = category
        self.date: datetime = date


class ExpenseTracker:
    CURRENT_ID: str = 1
    def __init__(self) -> None:
        self.expenses: list[Expense] = []
        self.load_expenses()

    def load_expenses(self) -> None:

        try:
            if not os.path.isfile("expenses.json"):
                file = open("expenses.json", "w")
                file.close()
                return

            file = open("expenses.json", "r")
            file_content = file.read().strip()
            if not file_content:  # Handle empty file case
                return

            # Parse the JSON content
            data = json.loads(file_content)

            for item in data:
                expense = Expense(
                    int(item["id"]),
                    float(item["amount"]),
                    item["description"],
                    item["category"],
                    self.string_to_datetime(item["date"]),
                )
                
                ExpenseTracker.CURRENT_ID = max(ExpenseTracker.CURRENT_ID, expense.id + 1)
                self.expenses.append(expense)
        except Exception as e:
            print(e)
            print("Error loading expenses!")
            sys.exit(1)

    def datetime_to_string(self, date: datetime) -> str:
        return str(date).split()[0]

    def string_to_datetime(self, date: str) -> datetime:
        splitted_arr = date.split("-")
        year: int = int(splitted_arr[0])
        month: int = int(splitted_arr[1])
        day: int = int(splitted_arr[2])

        return datetime(year, month, day)

    def write_expenses(self) -> None:

        try:
            file = open("expenses.json", "w")
            data = []
            for expense in self.expenses:
                row = {
                    "id": expense.id,
                    "amount": expense.amount,
                    "category": expense.category,
                    "description": expense.description,
                    "date": self.datetime_to_string(expense.date),
                }
                data.append(row)

            json_string = json.dumps(data)
            file.write(json_string)
        except Exception:
            print("Error writing expenses!")
            sys.exit(1)

    def add_expense(self, expense: Expense) -> None:
        self.expenses.append(expense)
        self.write_expenses()

    def delete_expense(self, id: int) -> None:
        found = False
        idx = 0
        for expense in self.expenses:
            if expense.id == id:
                self.expenses.pop(idx)
                found = True
            idx += 1

        if not found:
            print("Invalid expense ID!")
            sys.exit(1)

        self.write_expenses()

    def list_expenses(self) -> None:
        table = Table()
        headers = ["ID", "Amount", "Category", "Date", "Description"]
        for header in headers:
            table.add_column(header)

        for expense in self.expenses:
            table.add_row(
                str(expense.id),
                str(expense.amount),
                expense.category,
                self.datetime_to_string(expense.date),
                expense.description,
                style="bright_green",
            )

        console = Console()
        console.print(table)

    def update_expense(
        self, id: int, amount: float, category: str, description: str
    ) -> None:
        found = False
        idx = 0
        for expense in self.expenses:
            if expense.id == id:
                found = True
                break
            idx += 1

        if not found:
            print("Invalid expense ID!")
            sys.exit(1)

        if amount is not None:
            self.expenses[idx].amount = amount

        if category is not None:
            self.expenses[idx].category = category

        if description is not None:
            self.expenses[idx].description = description

        self.write_expenses()

    def summary_by_date(self, from_date: datetime, to_date: datetime) -> None:
        total: float = 0
        for expense in self.expenses:
            if expense.date >= from_date and expense.date <= to_date:
                total += expense.amount

        print(
            f"Total expenses from {self.datetime_to_string(from_date)} to {self.datetime_to_string(to_date)}: {total}"
        )

    def get_month_number(self, month: str) -> None:
        months: list[str] = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ]
        for idx, mon in enumerate(months):
            if mon == month:
                return idx + 1

        return -1

    def summary_by_month(self, month: str) -> None:
        total = 0
        for expense in self.expenses:
            if expense.date.month == self.get_month_number(month):
                total += expense.amount

        print(f"Total expenses for {month} is {total}")

    def summary_by_category(self, category: str) -> None:
        total = 0
        for expense in self.expenses:
            if expense.category == category:
                total += expense.amount

        print(f"Total expenses for {category} is {total}")

    def summary(self) -> None:
        total = 0
        for expense in self.expenses:
            total += expense.amount

        print(f"Total expense: {total}")


def check_date_format(date: str):
    date_parts = date.split("-")
    if len(date_parts) != 3:
        return False
    if len(date_parts[0]) != 4:
        return False
    if len(date_parts[1]) < 1 or len(date_parts[1]) > 2:
        return False
    if len(date_parts[2]) < 1 or len(date_parts[2]) > 2:
        return False
    return True


def string_to_datetime(date: str) -> datetime:
    splitted_arr = date.split("-")
    year: int = int(splitted_arr[0])
    month: int = int(splitted_arr[1])
    day: int = int(splitted_arr[2])

    return datetime(year, month, day)


parser = ArgParser()

parser.add_argument(
    Argument(
        "<command>",
        "The main command of expense tracker application.",
        ["list", "add", "update", "delete", "summary"],
    )
).add_option(Option("-a, --amount <amount>", "The amount of the expense.")).add_option(
    Option("-d, --description <description>", "The description of the expense.")
).add_option(
    Option(
        "-c, --category <category>",
        "The category of the expense.",
        ["Food", "Travel", "Entertainment", "Other"],
    )
).add_option(
    Option("-i, --id <id>", "The id of the expense.")
).add_option(
    Option("-f, --from <from>", "The start date of the summary.")
).add_option(
    Option("-t, --to <to>", "The end date of the summary.")
).add_option(
    Option(
        "-m --month <month>",
        "The month of the summary.",
        [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
    )
).add_option(
    Option("-dt, --date <date>", "The date of the expense.")
)
parser.parse()

args = parser.get_parsed_arguments()
options = parser.get_parsed_options()
keys = options.keys()

tracker = ExpenseTracker()

instruction = args[0]

if instruction == "add":
    if "amount" not in keys:
        print("Amount is required!")
        sys.exit(1)

    amount = float(options["amount"])
    if amount <= 0:
        print("Amount must be greater than zero(0)!")
        sys.exit(1)

    is_date = "date" in keys

    if is_date and not check_date_format(options["date"]):
        print("Invalid date format! Use YYYY-MM-DD")
        sys.exit(1)
        
    date = datetime.now()
    if is_date:
        date = string_to_datetime(options["date"])
    expense = Expense(
        ExpenseTracker.CURRENT_ID,
        amount,
        options["description"] or "No Description provided!",
        options["category"] or "Other",
        date,
    )
    ExpenseTracker.CURRENT_ID += 1
    tracker.add_expense(expense)
    sys.exit(0)

elif instruction == "update":
    if "id" not in keys:
        print("ID is required!")
        sys.exit(1)
        
    if "amount" not in keys and "description" not in keys and "category" not in keys:
        print("Atleast one of amount, description, or category is required!")
        sys.exit(1)
        
    id = int(options['id'])
    amount = None
    if "amount" in keys:
        amount = float(options['amount'])
    
    tracker.update_expense(id, amount, options["category"], options["description"])
    sys.exit(0)
    
elif instruction == "delete":
    if "id" not in keys:
        print("ID is required!")
        sys.exit(1)

    id = int(options['id'])
    tracker.delete_expense(id)
    sys.exit(0)
    
elif instruction == "summary":
    if "from" in keys and "to" in keys:
        if not check_date_format(options['from']) or not check_date_format(options['to']):
            print("Invalid date format! Use YYYY-MM-DD")
            sys.exit(1)
        
        from_date = string_to_datetime(options['from'])
        to_date = string_to_datetime(options['to'])
        
        if from_date > to_date:
            print("From date must be before to date!")
            sys.exit(1)
            
        tracker.summary_by_date(from_date, to_date)
    elif "month" in keys:
        tracker.summary_by_month(options['month'])
    elif "category" in keys:
        tracker.summary_by_category(options['category'])
    else :
        tracker.summary()
    
elif instruction == "list":
    tracker.list_expenses()
    sys.exit(0)
