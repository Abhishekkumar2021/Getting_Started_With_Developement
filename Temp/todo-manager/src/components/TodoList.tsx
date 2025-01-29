import { ChangeEvent, useRef, useState } from "react"
import TodoType from "../types/todo.types"
import Todo from "./Todo"
// import Status from "../constants/status.enum"

export default function TodoList() {
    // State for the todos
    const [todos, setTodos] = useState<TodoType[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    function handleClick(){
        console.log("Button clicked!")

        // Get the values from the input
        const latestRef = inputRef.current
        console.log("Latest value: ", latestRef?.value)
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        console.log("Event target: ", event.target)
        console.log("Current value: ", event.target.value)
    }

    return (
        <div className="todo-list">
            <h1>All Todos</h1>
            <div className="add-todo">
                <input type="text" placeholder="Enter title..." onChange={handleChange} ref={inputRef} />
                <button onClick={handleClick}>Add</button>
            </div>
            <div className="todos">
                {/* Show all the todos */}

                {
                    todos.map((todo, idx) => (<Todo key={idx} index={idx} todo={todo} />))
                }
            </div>
        </div>
    )
}