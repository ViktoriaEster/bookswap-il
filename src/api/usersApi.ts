import {axiosInstance} from "./instance.ts";
import type {PrivateUser, User, UserInput} from "../types/User.ts";

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

export const addUser = async (userData: UserInput):Promise<PrivateUser> => {
    try {
        const response = await axiosInstance.post<PrivateUser>(`/users`, userData);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error adding user");
    }
};

export const editUser = async (id: string, userData: UserInput):Promise<PrivateUser> => {
    try {
        const response = await axiosInstance.put<PrivateUser>(`/users/${id}`, userData);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error editing user");
    }
};

export const addRemoveFavoriteBook = async (data: {bookId: string, actionType: 'add'| 'remove'}):Promise<{status: string, bookId: string}> => {
    try {
        const response = await axiosInstance.patch<{status: string, bookId: string}>(`/users/favorite/${data.bookId}`, {action: data.actionType});
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error action with favorites books");
    }
}

export const deleteUser = async (id: string):Promise<{message: string, id: string}> => {
    try {
        const response = await axiosInstance.delete<{message: string}>(`/users/${id}`);
        return {message: response.data.message, id: id};
    }
    catch (error) {
        console.error(error);
        throw new Error("Error deleting user");
    }
};



