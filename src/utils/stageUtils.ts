import { request } from "./apiUtils"
import { Board } from "./boardUtils";
export type Stage = {
    id: string;
    title: string;
    description: string;
};

export const getAllStage = async (boardId: Board['id']) => {
    const response = await request(`/stage/${boardId}`, "GET");
    return response;
}

export const createStage = async (stage: Stage, boardId: Board['id']) => {
    const response = await request(`/stage/${boardId}/create`, "POST", {
        title: stage.title,
        description: stage.description
    });
    return response;
}


export const deleteStage = async (id: string, boardId: Board['id']) => {
    const response = await request(`/stage/${boardId}/delete/${id}`, "DELETE");
    return response;
}