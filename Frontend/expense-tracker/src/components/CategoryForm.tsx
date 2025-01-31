import { useRef } from "react";
import "../styles/CategoryForm.css"

interface CategoryFormProps {
    onSubmit: () => void
    onCancel: () => void
}

export default function CategoryForm(props: CategoryFormProps) {
    const {onCancel, onSubmit} = props;

    const categoryRef = useRef<HTMLInputElement>(null)

    async function handleSubmit(){
        const category = categoryRef.current?.value
        const jsonString = JSON.stringify({ category });

        // Make API call to add categoryc
        const BASE_URL = "http://localhost:8080"
        await fetch(`${BASE_URL}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonString
        })

        onSubmit()
    }

    return (
        <div className="category-form">
            <div className="form">
                <input type="text" placeholder="Category" ref={categoryRef} />
                <div className="buttons">
                    <button id="cancel" onClick={onCancel}>Cancel</button>
                    <button id="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}