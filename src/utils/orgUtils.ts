import { request } from "./apiUtils";

export type Org = {
    id: string;
    orgname: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export const orgMe = async () => {
    const response = await request("/org/me", "GET");
    return response;
}
// Done
export const createOrg = async (org: Org) => {
    const response = await request("/org/register", "POST", {
        orgname: org.orgname,
        email: org.email,
        password: org.password,
    });
    return response;
}

// Done
export const loginOrg = async (org: Org) => {
    const { email, password } = org;
    const response = await request("/org/login", "POST", {
        email,
        password
    });
    return response;
}

// Done
export const allMembers = async (page: number, limit: number) => {
    const response = await request(`/user/org/all`, "GET", {
        page,
        limit
    });
    return response;
}

// Done
export const orgAllTasks = async () => {
    const response = await request("/task/org/allTasks", "GET");
    return response;
}
