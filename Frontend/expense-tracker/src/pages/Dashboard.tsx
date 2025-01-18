import { useEffect, useState } from "react";
import "../styles/Dashboard.css"
import Expense from "../components/Expense";

const BASE_URL = "http://localhost:8080";

export default function Dashboard() {
    const [totalExpense, setTotalExpense] = useState(0)
    const [expenses, setExpenses] = useState([])
    const currentYear = new Date().getFullYear()

    // 3 cases
    //  1. no dependency array: Start, and on changing any state variable
    //  2. empty dependency array: Start
    //  3. [a, b, c, d, ...]: Start, and if any variable change
    useEffect(() => {
        async function fetchExpenseForCurrentYear(){
            try {
                const response = await fetch(`${BASE_URL}/summary/years/${currentYear}`, {
                    method: "GET"
                })
                const { data, message } = await response.json()
                setTotalExpense(data)
                console.log(data, message)
            } catch (error) {
                console.log(error)
            }
        }

        async function fetchAllExpense(){
            try {
                const response = await fetch(`${BASE_URL}/expenses`, {
                    method: "GET"
                })
                const { data, message } = await response.json()
                setExpenses(data)
                console.log(data, message)
            } catch (error) {
                console.log(error)
            }
        }

        fetchExpenseForCurrentYear()
        fetchAllExpense()
    }, [currentYear])

    return (
        <div className="dashboard">
            <h1>Total Expense in {currentYear} : <span>&#8377; {totalExpense} </span> </h1>

            {/* Expenses list */}

            <div className="expenses">
            <h2>Expense history</h2>
            {
                expenses.map((e, idx) => {
                    return <Expense key={idx} expense={e}/>;
                })
            }
            </div>
        </div>
    )
}