import { Board } from "../../utils/boardUtils";
import { Stage } from "../../utils/stageUtils";
import { Task } from "../../utils/taskUtils";

type StageModalAction = {
    type: "OPEN_STAGE_MODAL" | "CLOSE_STAGE_MODAL";
    payload: boolean;
};

type BoardModalAction = {
    type: "OPEN_BOARD_MODAL" | "CLOSE_BOARD_MODAL";
    payload: boolean;
};

type deleteBoardModalAction = {
    type: "OPEN_DELETE_BOARD_MODAL" | "CLOSE_DELETE_BOARD_MODAL";
    payload: boolean;
};

type InitializeBoard = {
    type: "INITIALIZE_BOARD";
    payload: Board;
    loadStatus: boolean
}

type DeleteBoard = {
    type: "DELETE_BOARD";
}

type UpdateBoardAction = {
    type: "UPDATE_BOARD";
    board: Board;
};

type InitializeStage = {
    type: "INITIALIZE_STAGE";
    payload: Stage[];
};

type createStageAction = {
    type: "CREATE_STAGE";
    payload: Stage;
};

type DeleteStageAction = {
    type: "DELETE_STAGE";
    id: string;
};

type UpdateNewStageTitle = {
    type: "UPDATE_NEW_STAGE_TITLE";
    payload: string;
}

type UpdateNewStageDescription = {
    type: "UPDATE_NEW_STAGE_DESCRIPTION";
    payload: string;
}

type UpdateStageTitle = {
    type: "UPDATE_STAGE_TITLE";
    payload: string;
    id: string
}

type UpdateBoardTitle = {
    type: "UPDATE_BOARD_TITLE";
    payload: string;
}

type UpdateBoardDescription = {
    type: "UPDATE_BOARD_DESCRIPTION";
    payload: string;
}
type ClearFields = {
    type: "CLEAR_FIELDS";
}


type UpdateStageOrder = {
    type: "UPDATE_STAGE_ORDER";
    payload: string;
}

type InitializeTask = {
    type: "INITIALIZE_TASK";
    payload: Task[];
}

type UpdateTask = {
    type: "UPDATE_TASK";
    payload: Task[];
}

export type State = {
    board: Board;
    stageModal: boolean;
    boardModal: boolean;
    boardLoading: boolean;
    stageLoading: boolean;
    stage: Stage[];
    task: Task[],
    newStage: Stage;
    deleteBoardModal: boolean;
};

type StageActions =
    | StageModalAction
    | BoardModalAction
    | deleteBoardModalAction
    | createStageAction
    | InitializeStage
    | UpdateStageTitle
    | DeleteStageAction
    | UpdateBoardAction
    | DeleteBoard
    | InitializeBoard
    | UpdateNewStageTitle
    | UpdateNewStageDescription
    | UpdateBoardTitle
    | UpdateBoardDescription
    | ClearFields
    | UpdateStageOrder
    | InitializeTask
    | UpdateTask
    ;

export const reducer = (state: State, action: StageActions) => {
    switch (action.type) {
        case "INITIALIZE_BOARD":
            return {
                ...state,
                board: action.payload,
                boardLoading: action.loadStatus
            }
        case "OPEN_BOARD_MODAL":
            return {
                ...state,
                boardModal: action.payload,
            };
        case "CLOSE_BOARD_MODAL":
            return {
                ...state,
                boardModal: action.payload,
            };
        case "UPDATE_BOARD":
            return {
                ...state,
                board: {
                    ...state.board,
                    title: action.board.title,
                    description: action.board.description,
                },
            };
        case "DELETE_BOARD":
            return {
                ...state,
                board: {
                    id: "",
                    title: "",
                    description: "",
                }
            }
        case "OPEN_STAGE_MODAL":
            return {
                ...state,
                stageModal: action.payload,
            };
        case "CLOSE_STAGE_MODAL":
            return {
                ...state,
                stageModal: action.payload,
            };
        case "OPEN_DELETE_BOARD_MODAL":
            return {
                ...state,
                deleteBoardModal: action.payload,
            };
        case "CLOSE_DELETE_BOARD_MODAL":
            return {
                ...state,
                deleteBoardModal: action.payload,
            };
        case "INITIALIZE_STAGE":
            console.log(action.payload)
            return {
                ...state,
                stage: [...action.payload],
            };
        case "CREATE_STAGE":
            return {
                ...state,
                stage: [...state.stage, action.payload],
            };
        case "UPDATE_STAGE_TITLE":
            return {
                ...state,
                stage: state.stage.map((stage) => {
                    if (stage.id === action.id) {
                        return {
                            ...stage,
                            title: action.payload,
                        };
                    }
                    return stage;
                })
            }
        case "UPDATE_STAGE_ORDER":
            return {
                ...state,
                board: {
                    ...state.board,
                    stageOrder: [...state.board.stageOrder!, action.payload],
                }
            }
        case "DELETE_STAGE":
            return {
                ...state,
                stage: state.stage.filter((stage) => stage.id !== action.id),
            };
        case "UPDATE_NEW_STAGE_TITLE":
            return {
                ...state,
                newStage: {
                    ...state.newStage,
                    title: action.payload,
                }
            }
        case "UPDATE_NEW_STAGE_DESCRIPTION":
            return {
                ...state,
                newStage: {
                    ...state.newStage,
                    description: action.payload,
                }
            }
        case "UPDATE_BOARD_TITLE":
            return {
                ...state,
                board: {
                    ...state.board,
                    title: action.payload,
                }
            }
        case "UPDATE_BOARD_DESCRIPTION":
            return {
                ...state,
                board: {
                    ...state.board,
                    description: action.payload,
                }
            }
        case "CLEAR_FIELDS":
            return {
                ...state,
                newStage: {
                    id: "",
                    title: "",
                    description: "",
                }
            }
        case "UPDATE_TASK":
            return {
                ...state,
                task: [...state.task, ...action.payload]
            }
        default:
            return state;
    }
};