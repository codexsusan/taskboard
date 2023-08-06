import { request } from "./apiUtils"
import { Board } from "./boardUtils";
import { Stage } from "./stageUtils";

export type Task = {
    id: string;
    title: string;
    description: string;
    priority: string;
    stageId?: string,
    boardId?: string
}

// Create a task
export const createTask = async (boardId: Board['id'], stageId: Stage['id'], task: Task) => {
    const response = await request(`/task/board/${boardId}/stage/${stageId}/create`, "POST", {
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority
    });
    return response;
}

// Update a task
export const updateTask = async (boardId: Board['id'], task: Task) => {
    const response = await request(`/task/board/${boardId}/stage/${task.stageId}/update/${task.id}`, "PATCH", task);
    return response;
}

// Delete a task
export const deleteTask = async (boardId: Board['id'], stageId: Stage['id'], taskId: Task['id']) => {
    const response = await request(`/task/board/${boardId}/stage/${stageId}/delete/${taskId}`, "DELETE");
    return response;
}

// Get all task of a stage
export const getAllTask = async (boardId: Board['id'], stageId: Task['id']) => {
    const response = await request(`/task/board/${boardId}/stage/${stageId}/all`, "GET");
    return response;
}

// Get single task: Currently not in use
export const getTask = async (boardId: Board['id'], taskId: Task['id'], stageId: Stage['id']) => {
    const response = await request(`/task/board/${boardId}/stage/${stageId}/view/${taskId}`, "GET");
    return response;
}
// Assign a task to a user
export const assignTask = async (boardId: Board['id'], taskId: Task['id'], userId: string) => {
    const response = await request(`/task/board/${boardId}/${taskId}/assign/${userId}`);
    return response;
}

// Unassign a task to a user
export const unassignTask = async (boardId: Board['id'], taskId: Task['id'], userId: string) => {
    const response = await request(`/task/board/${boardId}/${taskId}/unassign/${userId}`);
    return response;
}

// Get all assigned user of a task
export const allAssigned = async (boardId: Board['id'], taskId: Task['id']) => {
    const response = await request(`/task/board/${boardId}/${taskId}/allAssigned`, "GET");
    return response;
}

// Get all task of an organization
export const viewAllTasksInOrg = async () => {
    const response = await request("/task/org/allTasks", "GET");
    return response;
}

// Switch stage of a task
export const updateTaskStage = async (boardId: Board['id'], taskId: Task['id'], srcStageId: Stage['id'], destStageId: Stage['id']) => {
    const response = await request(`/task/board/${boardId}/${taskId}/${srcStageId}/${destStageId}`, "GET");
    return response;
}
