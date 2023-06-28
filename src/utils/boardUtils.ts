import { request } from "./apiUtils"

export type Board = {
    id: string;
    title: string;
    description: string;
}
// Done
export const createBoard = async (board: Board) => {
    const response = request("/board/create", "POST", {
        title: board.title,
        description: board.description
    });
    return response;
}

// Done
export const updateBoard = async (board: Board) => {
    const response = request(`/board/${board.id}`, "PATCH", {
        title: board.title,
        description: board.description
    });
    return response;
}

// Done
export const listBoard = async () => {
    const response = request("/board/list", "GET");
    return response;
}


export const getBoard = async (id: string) => {
    const response = request(`/board/${id}`, "GET");
    return response;
}

export const deleteBoard = async (id: string) => {
    const response = request(`/board/${id}`, "DELETE");
    return response;
}