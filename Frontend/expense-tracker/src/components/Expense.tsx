import ExpenseType from "../types/expense.type";
import dayjs from "dayjs"
import "../styles/Expense.css"
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router";

interface ExpenseProps{
    expense: ExpenseType,
    deleteExpense: (idx: number) => void,
    index: number
}


const BASE_URL = "http://localhost:8080"

export default function Expense(props: ExpenseProps) {
    const navigate = useNavigate()
    const {expense, deleteExpense, index} = props
    function handleEdit(){
        navigate(`/edit/${expense.id}`)
    }

    async function handleDelete(){
        try {
            // Delete in backend
            await fetch(`${BASE_URL}/expenses/${expense.id}`, {
                method: "DELETE"
            })

            // Delete in frontend
            deleteExpense(index)
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="expense">
            <div className="left">
                <p>{expense.category}</p>
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