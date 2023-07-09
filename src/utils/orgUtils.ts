import { request } from "./apiUtils";

export type Org = {
    id: string;
    orgName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export const orgMe = async () => {
    const response = await request("/org/me", "GET");
    return response;
}

export const createOrg = async (org: Org) => {
    const response = await request("/org/register", "POST", {
        orgName: org.orgName,
        email: org.email,
        password: org.password,
    });
    return response;
}

export const loginOrg = async (org: Org) => {
    const { email, password } = org;
    const response = await request("/org/login", "POST", {
        email,
        password
    });
    return response;
}

export const allMembers = async (page: number, limit: number) => {
    const response = await request(`/org/users`, "GET", {
        page,
        limit
    });
    return response;
}

export const orgAllTasks = async () => {
    const response = await request("/org/allTasks", "GET");
    return response;
}

export const orgAllBoards = async () => {
    const response = await request("/org/allBoards", "GET");
    return response;
}