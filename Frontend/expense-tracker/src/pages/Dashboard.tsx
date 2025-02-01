import { useCallback, useEffect, useState } from "react";
import "../styles/Dashboard.css"
import Expense from "../components/Expense";
import { NavLink } from "react-router";
import { FaCirclePlus } from "react-icons/fa6";
import { Tooltip } from 'react-tooltip'
import ExpenseType from "../types/expense.type";


const BASE_URL = "http://localhost:8080";

export default function Dashboard() {
    const [totalExpense, setTotalExpense] = useState(0)
    const [expenses, setExpenses] = useState<ExpenseType[]>([])
    const [filteredExpenses, setFilteredExpenses] = useState<ExpenseType[]>([])
    const currentYear = new Date().getFullYear()

    const [isMonthFilter, setIsMonthFilter] = useState(false)

    {/* this state variable is for filtering today's expenses */ }
    const [isTodayFilter, setIsTodayFilter] = useState(false)
    const [isRangeFilter, setIsRangeFilter] = useState(false)

    // 3 cases
    //  1. no dependency array: Start, and on changing any state variable
    //  2. empty dependency array: Start
    //  3. [a, b, c, d, ...]: Start, and if any variable change

    const fetchExpenseForCurrentYear = useCallback(async () => {
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
    }, [currentYear])

    useEffect(() => {
        async function fetchAllExpense() {
            try {
                const response = await fetch(`${BASE_URL}/expenses`, {
                    method: "GET"
                })
                const { data, message } = await response.json()
                setExpenses(data)
                setFilteredExpenses(data)
                console.log(data, message)
            } catch (error) {
                console.log(error)
            }
        }

        fetchExpenseForCurrentYear()
        fetchAllExpense()
    }, [currentYear, fetchExpenseForCurrentYear])

    async function deleteExpense(idx: number) {
        const updatedExpenses = expenses.filter((_, index) => index != idx)
        setExpenses(updatedExpenses)
        await fetchExpenseForCurrentYear()
    }

    function handleMonth(){
        // No other filter is there

        if(isMonthFilter) {
            setFilteredExpenses(expenses)
            setIsMonthFilter(false);
            return;
        }

        setIsMonthFilter(true)
        const date = new Date();

        const filExpenses = expenses.filter((expense) => {
            const expenseDate = new Date(expense.created)
            return date.getMonth() === expenseDate.getMonth() && date.getFullYear() === expenseDate.getFullYear()
        })

        setFilteredExpenses(filExpenses)
    }

    function handleTodaysExpense(){
        
        if(isTodayFilter) {
            setFilteredExpenses(expenses)
            setIsTodayFilter(false);
            return;
        }

        setIsTodayFilter(true)

        const date = new Date()

        const filtExpenses = expenses.filter((expense) => {
            const expenseDate = new Date(expense.created)
            return date.getDay() === expenseDate.getDay() && date.getFullYear() === expenseDate.getFullYear()
        })

        setFilteredExpenses(filtExpenses)
    }

    function handleRangeExpense(){

        if(isRangeFilter){
            setFilteredExpenses(expenses)
            setIsRangeFilter(false);
            return;
        }

        setIsRangeFilter(true)

        const filtExpenses = expenses.filter((expense) => {
            const expenseAmout = expense.amount
            return expenseAmout <= 200
        })

        setFilteredExpenses(filtExpenses)
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Total Expense in {currentYear} : <span>&#8377; {totalExpense} </span> </h1>
                <NavLink to='/add' data-tooltip-id="add-expense-button" data-tooltip-content="Add New Expense"><FaCirclePlus /></NavLink>
            </div>

            {/* Expenses list */}

            <div className="expenses">
                <div className="expense-header">
                    <h2>Expense history</h2>
                    <div className="filters">
                        <button onClick={handleMonth} style={{
                            backgroundColor: isMonthFilter ? "rgb(18, 172, 18)" : "#42424b"
                        }}>This Month</button>
                        {/* this button is for filtering today's expenses */}
                        <button onClick={handleTodaysExpense} style={{
                            backgroundColor: isTodayFilter ? "rgb(18, 172, 18)" : "#42424b"
                        }}>Today</button>
                        <button onClick={handleRangeExpense} style={{
                            backgroundColor: isRangeFilter ? "rgb(18, 172, 18)" : "#42424b"
                        }}>Up to Rs. 200/-</button>
                    </div>
                </div>
                <div className="expenses">
                    {
                        filteredExpenses.map((exp, idx) => {
                            return <Expense key={idx} expense={exp} index={idx} deleteExpense={deleteExpense} />;
                        })
                    }
                </div>

            </div>

            {/* Tooltip */}
            <Tooltip style={{
                backgroundColor: "#e8ab48",
                color: "#222222"
            }} id="add-expense-button" />
        </div>
    )
}