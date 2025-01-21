import ExpenseType from "../types/expense.type";
import dayjs from "dayjs"
import "../styles/Expense.css"
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";


export default function Expense({ expense, index, setExpenses, expenses }: { expense: ExpenseType, index: number, setExpenses: Dispatch<SetStateAction<never[]>>, expenses: never[] }) {
    
    function handleEdit(){

    }

    function handleDelete(){
        try {
            // API call you had to do
            const newExpenses = expenses.filter((_, idx) => {
                return idx != index
            })

            setExpenses(newExpenses)
            
        } catch (error) {
            console.log(error);
        }
    }
    
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
                    <div className="buttons">
                        <button className="edit" onClick={handleEdit}><MdEdit /> Edit</button>
                        <button className="delete" onClick={handleDelete}><MdDelete /> Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}