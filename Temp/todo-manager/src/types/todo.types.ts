import Status from "../constants/status.enum";

type TodoType = {
    title: string;
    status: Status;
}

export type TodoPropsType = {
    todo: TodoType;
    index: number;
}

export default TodoType;