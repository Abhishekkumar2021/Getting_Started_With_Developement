import { useCallback, useEffect, useRef, useState } from "react"
import "../styles/AddExpense.css"
import CategoryForm from "../components/CategoryForm"
import { BASE_URL } from "../constants/constants"
import { useNavigate } from "react-router"

export default function AddExpense() {
    const [categories, setCategories] = useState<string[]>([])
    const [isOpen, setIsOpen] = useState(false)

    const descriptionRef = useRef<HTMLInputElement>(null)
    const amountRef = useRef<HTMLInputElement>(null)
    const categoryRef = useRef<HTMLSelectElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()
    
    const getAllCategories = useCallback(async () => {
        const response = await fetch(`${BASE_URL}/categories`, {
            method: "GET"
        })
        const { data } = await response.json()
        setCategories(data)
    }, [])

    useEffect(() => {
        getAllCategories()
    }, [getAllCategories])

    function openModal() {
        setIsOpen(true)
    }

    function onCancel(){
        setIsOpen(false)
    }

    async function onSubmit() {
        setIsOpen(false)

        await getAllCategories()
    }

    async function handleSubmit(){
        // {
        //     "description": "Wow!",
        //     "category": "FOOD",
        //     "amount": 100,
        //     "created": "2024-12-17"
        // }

        const data = {
            description: descriptionRef.current?.value,
            category: categoryRef.current?.value,
            amount: amountRef.current ? parseFloat(amountRef.current.value) : 0,
            created: dateRef.current?.value
        }

        const dataString = JSON.stringify(data)
        
        await fetch(`${BASE_URL}/expenses`, {
            method: "POST",
            body: dataString,
            headers: {
                "Content-Type": "application/json"
            }
        })

        navigate("/dashboard")
    }

    return (
        <div className="add-expense">
            <div className="form">
                <h1>Add Expense</h1>
                <input type="text" placeholder="Description" ref={descriptionRef} />
                <input type="number" placeholder="Amount" ref={amountRef} />
                <div className="categories">
                    <select ref={categoryRef}>
                        {categories.map((category, idx) => <option key={idx} value={category}>{category}</option>)}
                    </select>
                    <button onClick={openModal}>Add New</button>
                </div>
                <input type="date" ref={dateRef} />
                <button id="submit" onClick={handleSubmit}>Submit</button>
            </div>
            
            {
                isOpen && <CategoryForm onCancel={onCancel} onSubmit={onSubmit} />
            }
        </div>
    )
}