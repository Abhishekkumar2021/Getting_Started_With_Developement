import { useEffect, useState } from "react";
import "../styles/Dashboard.css"
import Expense from "../components/Expense";
import { NavLink } from "react-router";
import { FaCirclePlus } from "react-icons/fa6";
import { Tooltip } from 'react-tooltip'


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
        async function fetchExpenseForCurrentYear() {
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

        async function fetchAllExpense() {
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
            <div className="dashboard-header">
                <h1>Total Expense in {currentYear} : <span>&#8377; {totalExpense} </span> </h1>
                <NavLink to='/add' data-tooltip-id="add-expense-button" data-tooltip-content="Add New Expense"><FaCirclePlus /></NavLink>
            </div>

            {/* Expenses list */}

            <div className="expenses">
                <h2>Expense history</h2>
                {
                    expenses.map((e, idx) => {
                        return <Expense key={idx} expense={e} index={idx} setExpenses={setExpenses} expenses={expenses}/>;
                    })
                }
            </div>

            {/* Tooltip */}
            <Tooltip style={{
                backgroundColor: "#e8ab48",
                color: "#222222"
            }} id="add-expense-button" />
        </div>
    )
}