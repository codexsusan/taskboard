export type User = {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
};

export type authType = "login" | "register";