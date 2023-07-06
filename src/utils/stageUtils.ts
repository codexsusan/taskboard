import { request } from "./apiUtils"
import { Board } from "./boardUtils";
import { Task } from "./taskUtils";
export type Stage = {
    id: string;
    title: string;
    description: string;
    task?: Task[]
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

export const deleteStage = async (id: Stage['id'], boardId: Board['id']) => {
    const response = await request(`/stage/${boardId}/delete/${id}`, "DELETE");
    return response;
}

export const updateStageTitle = async (id: string, title: string, boardId: Board['id']) => {
    const response = await request(`/stage/${boardId}/update/${id}`, "PATCH", { title });
    return response;
}