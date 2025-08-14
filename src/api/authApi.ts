import {axiosInstance} from "./instance.ts";
import type {PrivateUser} from "../types/User.ts";

export const loginUser = async (email: string, password: string): Promise<{user: PrivateUser, token: string}> => {
    try {
        const response = await axiosInstance.post("/auth/login", {email: email, password: password});
        localStorage.setItem("token", response.data.token);
        return response.data;
    }
    catch(error) {
        console.error(error);
        throw new Error("Error authenticating user");
    }
};

export const getMe = async (): Promise<PrivateUser> => {
    try {
        const response = await axiosInstance.get("/api/me");
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting me");
    }
};

export const logoutUser = (): boolean => {
    localStorage.removeItem("token");
    return true;
};