import { request } from "./apiUtils"

export type Task = {
    id: string;
    title: string;
    description: string;
}

export const getAllTask = async (stageId: Task['id']) => {
    const response = await request(`/task/${stageId}/list`, "GET");
    return response;
}

