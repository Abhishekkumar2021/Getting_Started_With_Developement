import ExpenseType from "../types/expense.type";
import dayjs from "dayjs"
import "../styles/Expense.css"

export default function Expense({ expense }: { expense: ExpenseType }) {
    return (
        <div className="expense">
            <div className="left">
                <h1>{expense.category}</h1>
            </div>
            <div className="right">
                <div className="header">
                    <h3>{expense.description}</h3>
                    <h1>&#8377; {expense.amount}</h1>
                </div>
                <div className="footer">
                    <p>{dayjs(expense.created).format("D MMM YYYY")}</p>
                </div>
            </div>
        </div>
    )
}