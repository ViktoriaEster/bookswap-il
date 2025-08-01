import {axiosInstance} from "./instance.ts";
import type {Comment, CommentInput} from "../types/Comment.ts";


export const getComments = async (): Promise<Comment[]> => {
    try {
        const response = await axiosInstance.get<Comment[]>('/comments');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting comments");
    }
};

export const getCommentsByID = async (id: string): Promise<Comment[]> => {
    try {
        const response = await axiosInstance.get<Comment[]>(`/comments/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting comment by id");
    }
};

export const getBookComments = async (id: string): Promise<Comment[]> => {
    try {
        const response = await axiosInstance.get<Comment[]>(`/comments/book/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting book comments");
    }
};

export const addComment = async (newComment: CommentInput): Promise<Comment> => {
    try {
        const response = await axiosInstance.post<Comment>(`/comments`, newComment);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error adding comment");
    }
};

export const deleteComment = async (id: string): Promise<{message: string, id: string}> => {
    try {
        const response = await axiosInstance.delete<{message: string}>(`/comments/${id}`);
        return {message: response.data.message, id: id};
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting comment");
    }
};