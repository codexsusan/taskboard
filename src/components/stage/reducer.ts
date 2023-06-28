import { Board } from "../../utils/boardUtils";
import { Stage } from "../../utils/stageUtils";

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
    payload: Board;
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

type UpdateBoardTitle = {
    type: "UPDATE_BOARD_TITLE";
    payload: string;
}

type UpdateBoardDescription = {
    type: "UPDATE_BOARD_DESCRIPTION";
    payload: string;
}

export type State = {
    board: Board;
    stageModal: boolean;
    boardModal: boolean;
    boardLoading: boolean;
    stageLoading: boolean;
    stage: Stage[];
    newStage: Stage;
    deleteBoardModal: boolean;
};

type BoardActions =
    | StageModalAction
    | BoardModalAction
    | deleteBoardModalAction
    | createStageAction
    | InitializeStage
    | DeleteStageAction
    | UpdateBoardAction
    | DeleteBoard
    | InitializeBoard
    | UpdateNewStageTitle
    | UpdateNewStageDescription
    | UpdateBoardTitle
    | UpdateBoardDescription;

export const reducer = (state: State, action: BoardActions) => {
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
                    title: action.payload.title,
                    description: action.payload.description,
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
            return {
                ...state,
                stage: [...action.payload],
            };
        case "CREATE_STAGE":
            return {
                ...state,
                stage: [...state.stage, action.payload],
            };
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
        default:
            return state;
    }
};