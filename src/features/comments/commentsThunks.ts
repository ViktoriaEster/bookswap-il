import {
    addComment, deleteComment,
    getBookComments,
    getCommentByID,
    getComments, toggleLikeComment
} from "../../api/commentsApi.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import type {UserComment, CommentInput} from "../../types/UserComment.ts";


export const getCommentsThunk = createAsyncThunk<UserComment[], void,  {rejectValue: string}>(
    'comments/getComments',
    async (_, thunkAPI) => {
        try {
            return await getComments();
        }
        catch (error:any) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || 'Error fetching book comments');
        }
    }
);

export const getBookCommentsThunk = createAsyncThunk<{bookId: string, comments: UserComment[]}, string, {rejectValue: string}>(
    'comments/getBookComments',
    async (bookId: string, thunkAPI) => {
        try {
            const response = await getBookComments(bookId);
            return {bookId: bookId, comments: response};
        } catch (error: any) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || 'Error fetching book comments');
        }
    }
);

export const getCommentByIdThunk = createAsyncThunk<UserComment, string, {rejectValue: string}>(
    'comments/getCommentByID',
    async (id, thunkAPI) => {
        try {
            return await getCommentByID(id);
        }
        catch (error: any) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || 'Error fetching comment');
        }
    }
);

export const toggleLikeCommentThunk = createAsyncThunk<UserComment, {id: string, userId: string}, {rejectValue: string}>(
    'comments/likeDislikeComment',
    async ({id, userId}, thunkAPI) => {
        try {
            return await toggleLikeComment(id, userId);
        }
        catch (error: any) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || `Error toggle like comment`);
        }
    }
);

export const addCommentThunk = createAsyncThunk<UserComment, CommentInput, {rejectValue: string}>(
    'comments/addComment',
    async (newComment, thunkAPI) => {
        try {
            return await addComment(newComment);
        }
        catch (error: any) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || 'Error adding comment');
        }
    }
);

export const deleteCommentThunk = createAsyncThunk<{ message: string, id: string }, string, {rejectValue: string}>(
    'comments/deleteComment',
    async (id, thunkAPI) => {
        try {
            return await deleteComment(id);
        }
        catch (error: any) {
            console.error(error);
            return  thunkAPI.rejectWithValue(error.message || 'Error deleting comment');
        }
    }
);




