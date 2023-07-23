import { UserData } from "../components/home/RegisterUser";
import { User } from "../types/UserTypes";
import { request } from "./apiUtils";

// Create a user
export const createUser = async (user: UserData) => {
    const response = await request("/user/register", "POST", {
        username: user.username,
        email: user.email,
        password: user.password,
    });
    return response;
}

// Login a user
export const loginUser = async (user: User) => {
    const response = await request("/user/login", "POST", {
        email: user.email,
        password: user.password
    });
    return response;
}

// Verify Existing User : Currently not used
export const verifyExistingUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return true;
    }
    return false;
}

// List all users from org
export const allOrgUsers = async () => {
    const response = await request(`/user/org/allusers`, "GET");
    return response;
}

// Current User
export const userMe = async () => {
    const response = await request("/users/me", "GET");
    return response;
}

// List all users from board
export const allBoardMembers = async (boardId: string) => {
    const response = await request(`/user/all/board/${boardId}`, "GET");
    return response;
}

// Delete a user
export const deleteUser = async (userId: string) => {
    const response = await request(`/user/delete/${userId}`, "DELETE");
    return response;
}