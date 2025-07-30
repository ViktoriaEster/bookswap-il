import {axiosInstance} from "./instance.ts";
import type {User, UserInput} from "../types/User.ts";

export const getUsers = async ():Promise <User[]> => {
    try {
        const response = await axiosInstance.get<User[]>("/users");
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error getting users");
    }
};

export const getUser = async (id: string):Promise<User> => {
    try {
        const response = await axiosInstance.get<User>(`/users/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error getting user");
    }
};

export const addUser = async (userData: UserInput):Promise<User> => {
    try {
        const response = await axiosInstance.post<User>(`/users`, userData);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error adding user");
    }
};

export const editUser = async (id: string, userData: UserInput):Promise<User> => {
    try {
        const response = await axiosInstance.put<User>(`/users/${id}`, userData);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error editing user");
    }
};

export const deleteUser = async (id: string):Promise<{message: string}> => {
    try {
        const response = await axiosInstance.delete<{message: string}>(`/users/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error deleting user");
    }
};



