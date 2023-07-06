import { User } from "../types/UserTypes";
import { request } from "./apiUtils";

export const createUser = async (user: User) => {
    const response = await request("/users/register", "POST", {
        userName: user.name,
        email: user.email,
        password: user.password,
    });
    return response;
}

export const checkUser = async (user: User) => {
    const response = await request("/auth/login", "POST", {
        email: user.email,
        password: user.password
    });
    return response;
}


export const verifyExistingUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return true;
    }
    return false;
}