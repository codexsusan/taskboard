import { request } from "./apiUtils"
import { Board } from "./boardUtils";
import { Stage } from "./stageUtils";

export type Task = {
    id: string;
    title: string;
    description: string;
    priority: string;
    stageId?: string
}

export const getAllTask = async (boardId: Board['id'], stageId: Task['id']) => {
    const response = await request(`/task/board/${boardId}/stage/${stageId}/all`, "GET");
    return response;
}

// Done
export const createTask = async (boardId: Board['id'], stageId: Stage['id'], task: Task) => {
    const response = await request(`/task/board/${boardId}/stage/${stageId}/create`, "POST", {
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority
    });
    return response;
}

export const getTask = async (boardId: Board['id'], taskId: Task['id'], stageId: Stage['id']) => {
    const response = await request(`/task/board/${boardId}/stage/${stageId}/view/${taskId}`, "GET");
    return response;
}

export const deleteTask = async (boardId: Board['id'], stageId: Stage['id'], taskId: Task['id']) => {
    const response = await request(`/task/board/${boardId}/stage/${stageId}/delete/${taskId}`, "DELETE");
    return response;
}

export const updateTask = async (boardId: Board['id'], task: Task) => {
    const response = await request(`/task/board/${boardId}/stage/${task.stageId}/update/${task.id}`, "PATCH", task);
    return response;
}
export const allAssigned = async (boardId: Board['id'], taskId: Task['id']) => {
    const response = await request(`/task/board/${boardId}/${taskId}/allAssigned`, "GET");
    return response;
}

export const updateTaskStage = async (boardId: Board['id'], taskId: Task['id'], srcStageId: Stage['id'], destStageId: Stage['id']) => {
    const response = await request(`/task/board/${boardId}/${taskId}/${srcStageId}/${destStageId}`, "GET");
    return response;
}
