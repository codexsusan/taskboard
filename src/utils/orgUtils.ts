import { request } from "./apiUtils";

export type Org = {
    id: string;
    orgName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

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

export const allMembers = async () => {
    const response = await request("/org/users", "GET");
    return response;
} 