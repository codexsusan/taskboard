import { request } from "./apiUtils"

export type Task = {
    id: string;
    title: string;
    description: string;
    priority: string;
}

export const getAllTask = async (stageId: Task['id']) => {
    const response = await request(`/task/${stageId}/list`, "GET");
    return response;
}

export const createTask = async (task: Task, stageId: Task['id']) => {
    const response = await request(`/task/${stageId}/create`, "POST", {
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority
    });
    return response;
}
