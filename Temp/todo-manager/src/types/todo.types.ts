import Status from "../constants/status.enum";

type TodoType = {
    title: string;
    status: Status;
}

export type TodoPropsType = {
    todo: TodoType;
    index: number;
    deleteTodo: (index: number) => void;
}

export default TodoType;