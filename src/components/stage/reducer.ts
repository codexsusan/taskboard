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


export type State = {
    board: Board;
    stageModal: boolean;
    boardModal: boolean;
    stage: Stage[];
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
    | DeleteBoard;

export const reducer = (state: State, action: BoardActions) => {
    switch (action.type) {
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
        default:
            return state;
    }
};