import {axiosInstance} from "./instance.ts";
import type {UserComment, CommentInput} from "../types/UserComment.ts";


export const getComments = async (): Promise<UserComment[]> => {
    try {
        const response = await axiosInstance.get<UserComment[]>('/comments');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting comments");
    }
};

export const getCommentByID = async (id: string): Promise<UserComment> => {
    try {
        const response = await axiosInstance.get<UserComment>(`/comments/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting comment by id");
    }
};

export const getBookComments = async (id: string): Promise<UserComment[]> => {
    try {
        const response = await axiosInstance.get<UserComment[]>(`/comments/book/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting book comments");
    }
};

export const toggleLikeComment = async (id: string, userId: string): Promise<UserComment> => {
    try {
        const response = await axiosInstance.patch<UserComment>(`/comments/like`, {id: id, userId: userId});
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error like or dislike comment");
    }
}

export const addComment = async (newComment: CommentInput): Promise<UserComment> => {
    try {
        const response = await axiosInstance.post<UserComment>(`/comments`, newComment);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error adding comment");
    }
};

export const deleteComment = async (id: string): Promise<{ message: string, id: string }> => {
    try {
        const response = await axiosInstance.delete<{ message: string }>(`/comments/${id}`);
        return {message: response.data.message, id: id};
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting comment");
    }
};