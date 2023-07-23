import { request } from "./apiUtils"

export type Board = {
    id: string;
    title: string;
    description: string;
    stageOrder?: string[];
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
    const response = request(`/board/update/${board.id}`, "PATCH", {
        title: board.title,
        description: board.description
    });
    return response;
}

// Done
export const orgAllBoards = async () => {
    const response = request("/board/org/all", "GET");
    return response;
}

// Done
export const getBoard = async (id: string) => {
    const response = request(`/board/view/${id}`, "GET");
    return response;
}

export const addMember = async (boardId: string, email: string) => {
    const response = request(`/board/${boardId}/add-member`, "POST", {
        email: email
    });
    return response;
}

export const removeMember = async (boardId: string, memberId: string) => {
    const response = request(`/board/${boardId}/remove-member/${memberId}`, "DELETE");
    return response;
}

// Done
export const deleteBoard = async (id: string) => {
    const response = request(`/board/${id}`, "DELETE");
    return response;
}