import { request } from "./apiUtils"
import { Stage } from "./stageUtils";

export type Task = {
    id: string;
    title: string;
    description: string;
    priority: string;
    stageId?: string
}

export const getAllTask = async (stageId: Task['id']) => {
    const response = await request(`/task/${stageId}/list`, "GET");
    return response;
}

export const createTask = async (stageId: Stage['id'], task: Task) => {
    const response = await request(`/task/${stageId}/create`, "POST", {
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority
    });
    return response;
}

export const getTask = async (taskId: Task['id'], stageId: Stage['id']) => {
    const response = await request(`/task/${stageId}/list/${taskId}`, "GET");
    return response;
}

export const deleteTask = async (stageId: Stage['id'], taskId: Task['id']) => {
    const response = await request(`/task/${stageId}/delete/${taskId}`, "DELETE");
    return response;
}

export const updateTask = async (task: Task) => {
    const response = await request(`/task/${task.stageId!}/update/${task.id}`, "PATCH", task);
    return response;
}
