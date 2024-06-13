import { request } from "./apiUtils";

export type Org = {
    id: string;
    orgname: string;
    email: string;
    password: string;
    confirmPassword: string;
};

// NOTE: Currently not in use
// export const orgMe = async () => {
//     const response = await request("/org/me", "GET");
//     return response;a
// }

// Organization signup
export const orgSignUp = async (org: Org) => {
    const response = await request("/org/register", "POST", {
        orgname: org.orgname,
        email: org.email,
        password: org.password,
    });
    return response;
}

// Organization login
export const orgLogin = async (org: Org) => {
    const { email, password } = org;
    const response = await request("/org/login", "POST", {
        email,
        password
    });
    return response;
}

// Delete Organization
export const orgDelete = async () => {
    const response = await request("/org/delete", "DELETE");
    return response;
}

// Update Organization basic such as orgname and email
export const orgUpdateBasic = async (orgname: string, email: string) => {
    const response = await request("/org/update/basic", "PATCH", {
        orgname, email
    });
    return response;
}

// Update Password 
export const updateCredentials = async (oldPassword: string, newPassword: string) => {
    const response = await request("/org/update/credentials", "PATCH", {
        oldPassword, newPassword
    });
    return response;
}

// Get organization data
export const getOrg = async (orgId: string) => {
    const response = await request(`/org/view/${orgId}`);
    return response;
}

// Need to work with avatar upload
// export const avatar = async () =>{
    // const response = await request("/org/update/avatar", "PATCH", {

    // })
// }