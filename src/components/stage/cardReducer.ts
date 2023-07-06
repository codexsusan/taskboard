import { Task } from "../../utils/taskUtils";

export type State = {
    task: Task[];
    newTask: Task;
    modalTask: boolean;
    editStage: boolean;
};

type InitializeTask = {
    type: "INITIALIZE_TASK";
    payload: Task[];
};

type SwitchTaskModal = {
    type: "SWITCH_TASK_MODAL";
    payload: boolean;
};

type AddNewTask = {
    type: "ADD_NEW_TASK";
    payload: Task;
};

type UpdateTask = {
    type: "UPDATE_TASK";
    payload: Task;
}

type DeleteTask = {
    type: "DELETE_TASK";
    id: string;
}

type ClearFields = {
    type: "CLEAR_FIELDS";
};

type EditStageStatus = {
    type: "EDIT_STAGE";
    payload: boolean;
};

type UpdateNewTask = {
    type: "UPDATE_NEW_TASK";
    task: Task;
}

export type TaskAction =
    | InitializeTask
    | SwitchTaskModal
    | UpdateNewTask
    | AddNewTask
    | UpdateTask
    | DeleteTask
    | EditStageStatus
    | ClearFields;

export const reducer = (state: State, action: TaskAction) => {
    switch (action.type) {
        case "INITIALIZE_TASK":
            return {
                ...state,
                task: [...action.payload],
            };
        case "SWITCH_TASK_MODAL":
            return {
                ...state,
                modalTask: action.payload,
            };
        case "UPDATE_NEW_TASK":
            return {
                ...state,
                newTask: action.task,
            }
        case "ADD_NEW_TASK":
            return {
                ...state,
                task: [...state.task, action.payload],
            };
        case "UPDATE_TASK":
            return {
                ...state,
                task: state.task.map((task) => {
                    if (task.id === action.payload.id) {
                        return {
                            ...task,
                            title: action.payload.title,
                            description: action.payload.description,
                            priority: action.payload.priority
                        }
                    }
                    return task;
                })
            }
        case "DELETE_TASK": {
            console.log(state);
            return {
                ...state,
                task: state.task.filter((task) => task.id !== action.id),
            }
        }
        case "EDIT_STAGE":
            return {
                ...state,
                editStage: action.payload,
            };
        case "CLEAR_FIELDS":
            return {
                ...state,
                newTask: {
                    id: "",
                    title: "",
                    description: "",
                    priority: "",
                },
            };
        default:
            return state;
    }
};