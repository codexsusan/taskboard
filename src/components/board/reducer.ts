import { Board } from "../../utils/boardUtils";

export type BoardState = {
    boards: Board[];
    loading: boolean;
    modalStatus: boolean;
    newBoard: Board;
};

type InitializeState = {
    type: "INITIALIZE_STATE";
    data: Board[];
};

type updateModalStatus = {
    type: "UPDATE_MODAL_STATUS";
    payload: boolean;
};

type addBoardAction = {
    type: "ADD_BOARD";
    payload: Board;
};

type updateNewBoardTitle = {
    type: "UPDATE_NEW_BOARD_TITLE";
    payload: string;
}

type updateNewBoardDescription = {
    type: "UPDATE_NEW_BOARD_DESCRIPTION";
    payload: string;
}

export type ReducerAction =
    | InitializeState
    | updateModalStatus
    | addBoardAction
    | updateNewBoardDescription
    | updateNewBoardTitle;

export const reducer = (state: BoardState, action: ReducerAction) => {
    switch (action.type) {
        case "INITIALIZE_STATE":
            return {
                ...state,
                loading: false,
                boards: [...action.data],
            };
        case "UPDATE_MODAL_STATUS":
            return { ...state, modalStatus: action.payload };
        case "ADD_BOARD":
            return { ...state, boards: [...state.boards, action.payload] };
        case "UPDATE_NEW_BOARD_TITLE":
            return { ...state, newBoard: { ...state.newBoard, title: action.payload } };
        case "UPDATE_NEW_BOARD_DESCRIPTION":
            return { ...state, newBoard: { ...state.newBoard, description: action.payload } };
        default:
            return state;
    }
};