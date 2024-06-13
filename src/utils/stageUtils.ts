import { request } from "./apiUtils"
import { Board } from "./boardUtils";
import { Task } from "./taskUtils";
export type Stage = {
    id: string;
    title: string;
    task?: Task[]
};

// Create a stage
export const createStage = async (stage: Stage, boardId: Board['id']) => {
    const response = await request(`/stage/board/${boardId}/create`, "POST", {
        title: stage.title,
    });
    return response;
}

// Delete a stage
export const deleteStage = async (id: Stage['id'], boardId: Board['id']) => {
    const response = await request(`/stage/board/${boardId}/delete/${id}`, "DELETE");
    return response;
}

// Update stage
export const updateStageTitle = async (id: string, title: string, boardId: Board['id']) => {
    const response = await request(`/stage/board/${boardId}/update/${id}`, "PATCH", { title });
    return response;
}

// Get all stages of a board 
export const getAllStage = async (boardId: Board['id']) => {
    const response = await request(`/stage/board/${boardId}/stages/all`, "GET");
    return response;
}

// Get single stage
export const getSingleStage = async ( boardId: Board['id'], id: Stage['id'],) => {
    const response = await request(`/stage/board/${boardId}/stage/${id}`, "GET");
    return response;
}


