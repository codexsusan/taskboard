import { Board } from "../../utils/boardUtils";
import { Task } from "../../utils/taskUtils";

export type Stage = {
    id: string;
    title: string;
    description: string;
    tasks: Task[];
};

type State = {
    board: Board;
    stage: Stage[];
};

type InitializeBoard = {
    type: "INITIALIZE_BOARD";
    payload: Board;
};

type UpdateBoard = {
    type: "UPDATE_BOARD";
    payload: Board;
}

type InitializeStage = {
    type: "INITIALIZE_STAGE";
    payload: Stage[];
};

type AddStage = {
    type: "ADD_STAGE";
    payload: Stage;
}

type DeleteStage = {
    type: "DELETE_STAGE";
    payload: Stage['id'];
}

type UpdateStageTitle = {
    type: "UPDATE_STAGE_TITLE";
    payload: {
        id: Stage['id'];
        title: Stage['title'];
    }
}

type AddTask = {
    type: "ADD_TASK";
    payload: {
        stageId: Stage['id'];
        task: Task;
    }
}

type DeleteTask = {
    type: "DELETE_TASK";
    payload: {
        stageId: Stage['id'];
        taskId: Task['id'];
    }
}

type UpdateTask = {
    type: "UPDATE_TASK";
    payload: Task;
}


export type Action =
    | InitializeBoard
    | UpdateBoard
    | InitializeStage
    | AddStage
    | DeleteStage
    | UpdateStageTitle
    | AddTask
    | DeleteTask
    | UpdateTask;
export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "INITIALIZE_BOARD":
            return {
                ...state,
                board: action.payload,
            };
        case "UPDATE_BOARD":
            return {
                ...state,
                board: action.payload,
            }
        case "INITIALIZE_STAGE":
            return {
                ...state,
                stage: [...action.payload],
            };
        case "ADD_STAGE":
            return {
                ...state,
                board: {
                    ...state.board,
                    stageOrder: [...state.board.stageOrder!, action.payload.id],
                },
                stage: [...state.stage, action.payload],
            }
        case "UPDATE_STAGE_TITLE":
            return {
                ...state,
                stage: state.stage.map((stage) => {
                    if (stage.id === action.payload.id) {
                        return {
                            ...stage,
                            title: action.payload.title,
                        }
                    }
                    return stage;
                })
            }
        case "DELETE_STAGE":
            return {
                ...state,
                stage: state.stage.filter((stage) => stage.id !== action.payload),
            }
        case "ADD_TASK":
            return {
                ...state,
                stage: state.stage.map((stage) => {
                    if (stage.id === action.payload.stageId) {
                        return {
                            ...stage,
                            tasks: [...stage.tasks, action.payload.task],
                        }
                    }
                    return stage;
                })
            }
        case "UPDATE_TASK":
            return {
                ...state,
                stage: state.stage.map((stage: Stage) => {
                    if (stage.id === action.payload.stageId) {
                        return {
                            ...stage,
                            tasks: stage.tasks.map((task: Task) => {
                                if (task.id === action.payload.id) {
                                    return {
                                        ...task,
                                        title: action.payload.title,
                                        description: action.payload.description,
                                        priority: action.payload.priority,
                                    }
                                }
                                return task;
                            })
                        }
                    }
                    return stage;
                })
            }
        case "DELETE_TASK":
            return {
                ...state,
                stage: state.stage.map((stage) => {
                    if (stage.id === action.payload.stageId) {
                        return {
                            ...stage,
                            tasks: stage.tasks.filter((task) => task.id !== action.payload.taskId),
                        }
                    }
                    return stage;
                })
            }

        default:
            return state;
    }
};