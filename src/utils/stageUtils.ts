import { request } from "./apiUtils"
import { Board } from "./boardUtils";
import { Task } from "./taskUtils";
export type Stage = {
    id: string;
    title: string;
    // description: string;
    task?: Task[]
};

// Done
export const getAllStage = async (boardId: Board['id']) => {
    const response = await request(`/stage/board/${boardId}/stages/all`, "GET");
    return response;
}

// export const getSingleStage = async ( boardId: Board['id'], id: Stage['id'],) => {
//     const response = await request(`/stage/board/${boardId}/stage/${id}`, "GET");
//     return response;
// }

// Done
export const createStage = async (stage: Stage, boardId: Board['id']) => {
    const response = await request(`/stage/board/${boardId}/create`, "POST", {
        title: stage.title,
    });
    return response;
}

export const deleteStage = async (id: Stage['id'], boardId: Board['id']) => {
    const response = await request(`/stage/board/${boardId}/delete/${id}`, "DELETE");
    return response;
}

export const updateStageTitle = async (id: string, title: string, boardId: Board['id']) => {
    const response = await request(`/stage/board/${boardId}/update/${id}`, "PATCH", { title });
    return response;
}