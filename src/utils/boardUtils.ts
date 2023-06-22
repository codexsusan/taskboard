import { request } from "./apiUtils"

export type Board = {
    id: string;
    title: string;
    description: string;
}


export const createBoard = async (board: Board) => {
    const response = request("/board/create", "POST", {
        title: board.title,
        description: board.description
    });
    return response;
}

export const listBoard = async () => {
    const response = request("/board/list", "GET");
    return response;
}