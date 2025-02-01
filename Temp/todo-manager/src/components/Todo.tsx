import { TodoPropsType } from "../types/todo.types";

export default function Todo(props: TodoPropsType){
    const {index, todo , deleteTodo} = props;
    
    function handleDelete(){
        deleteTodo(index)
    }

    return (
        <div className="todo">
            <h1>{todo.title}</h1>
            <h2>{todo.status}</h2>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}