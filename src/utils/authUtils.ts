import { User } from "../types/UserTypes";
import { request } from "./apiUtils";

export const createUser = async (user: User) => {
    const response = await request("/auth/signup", "POST", {
        userName: user.name,
        email: user.email,
        password: user.password,
    });
    return response;
}