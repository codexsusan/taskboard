import { UserData } from "../components/home/RegisterUser";
import { User } from "../types/UserTypes";
import { request } from "./apiUtils";
import jwt_decode from "jwt-decode";

export type UserTypes = {
  userType: string;
  iat: number;
} & (
  | {
      user: {
        id: string;
      };
    }
  | {
      org: {
        id: string;
      };
    }
);

// Create a user
export const userSignUp = async (user: UserData) => {
  const response = await request("/user/register", "POST", {
    username: user.username,
    email: user.email,
    password: user.password,
  });
  return response;
};

// Login a user
export const userLogIn = async (user: User) => {
  const response = await request("/user/login", "POST", {
    email: user.email,
    password: user.password,
  });
  return response;
};

// Update basic info
export const updateBasicInfo = async (username: string, email: string) => {
  const response = await request("/user/update/basic", "PATCH", {
    username,
    email,
  });
  return response;
};

// Update user password
export const updateCredentials = async (
  oldPassword: string,
  newPassword: string
) => {
  const response = await request("/user/update/credentials", "PATCH", {
    oldPassword,
    newPassword,
  });
  return response;
};

// Get user data
export const getUser = async (userId: string) => {
  const response = await request(`/user/view/${userId}`);
  return response;
};

// Get all users from the organization paginated data
export const getAllUsersPaginated = async (page: number, limit: number) => {
  const response = await request(`/user/org/all`, "GET", {
    page,
    limit,
  });
  return response;
};

// Get all users from the organization
export const getAllUsersInOrg = async () => {
  const response = await request(`/user/org/allusers`, "GET");
  return response;
};

// Get all board members
export const getAllUsersInBoard = async (boardId: string) => {
  const response = await request(`/user/all/board/${boardId}`, "GET");
  return response;
};

// Delete a user
export const deleteUser = async (userId: string) => {
  const response = await request(`/user/delete/${userId}`, "DELETE");
  return response;
};

export const currentUser: () => UserTypes = () => {
  const token = localStorage.getItem("token");
  const user: UserTypes = jwt_decode(token!);
  return user;
};

// TODO: Update avatar
