import { request } from "./apiUtils"

export type Board = {
    id: string;
    title: string;
    description: string;
    stageOrder?: string[];
}

// Create a board
export const createBoard = async (board: Board) => {
    const response = request("/board/create", "POST", {
        title: board.title,
        description: board.description
    });
    return response;
}

// Get a board detail
export const getBoard = async (id: string) => {
    const response = request(`/board/view/${id}`, "GET");
    return response;
}

// Update a board
export const updateBoard = async (board: Board) => {
    const response = request(`/board/update/${board.id}`, "PATCH", {
        title: board.title,
        description: board.description
    });
    return response;
}

// Delete a board
export const deleteBoard = async (id: string) => {
    const response = request(`/board/${id}`, "DELETE");
    return response;
}

// Get all board of an organization
export const getAllBoards = async () => {
    const response = request("/board/org/all", "GET");
    return response;
}

// Add a member to a board
export const addMember = async (boardId: string, email: string) => {
    const response = request(`/board/${boardId}/add-member`, "POST", {
        email: email
    });
    return response;
}

// Remove member from a board
export const removeMember = async (boardId: string, memberId: string) => {
    const response = request(`/board/${boardId}/remove-member/${memberId}`, "DELETE");
    return response;
}