import type {Author, AuthorCreateUpdateInput} from "../types/Author.ts"
import {axiosInstance} from "./instance.ts";


export const getAuthors = async (): Promise<Author []> => {
    try {
        const response = await axiosInstance.get<Author[]>("/authors");
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting authors");
    }
};

export const getAuthor = async (id: string): Promise<Author> => {
    try {
        const response = await axiosInstance.get<Author>(`/authors/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting author");
    }
};

export const addAuthor = async (authorData: AuthorCreateUpdateInput): Promise<Author> => {
    try {
        const response = await axiosInstance.post<Author>(`/authors`, authorData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error adding author");
    }
};

export const updateAuthor = async (id: string, update: AuthorCreateUpdateInput): Promise<Author> => {
    try {
        const response = await axiosInstance.put<Author>(`/authors/${id}`, update);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error updating author");
    }
};

export const deleteAuthor = async (id: string): Promise<{message: string, id: string}> => {
    try {
        const response = await axiosInstance.delete<{message: string}>(`/authors/${id}`);
        return {message: response.data.message, id: id};
    }
    catch (error) {
        console.error(error);
        throw new Error("Error deleting author");
    }
};