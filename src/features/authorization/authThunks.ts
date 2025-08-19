import {createAsyncThunk} from "@reduxjs/toolkit";
import type {AuthLoginData, PrivateUser} from "../../types/User.ts";
import {getMe, loginUser} from "../../api/authApi.ts";
import {addRemoveFavoriteBook} from "../../api/usersApi.ts";
import {editBookLikeCount} from "../books/booksSlice.ts";
import {editFavoriteBooks} from "../users/usersSlice.ts";


export const loginUserThunk = createAsyncThunk<{token: string}, AuthLoginData, {rejectValue: string}>(
    'auth/loginUser',
    async (data: AuthLoginData, thunkAPI) => {
        try {
            return await loginUser(data);
        }
        catch (error: any) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || "Failed to login");
        }
    }
);

export const getMeThunk = createAsyncThunk<PrivateUser, void, { rejectValue: string }>(
    'auth/getMe',
    async (_, thunkAPI) => {
        try {
            return await getMe();
        } catch (error: any) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || "Failed to getting me");
        }
    }
);

export const addRemoveFavoriteBookThunk = createAsyncThunk<{status: string, bookId: string, actionType: 'add' | 'remove'} , {bookId: string, actionType:'add'| 'remove', userId: string}, {rejectValue: string}>(
    "users/addRemoveFavoriteBook",
    async ({bookId, actionType, userId}, thunkAPI) => {
        try {
            const response = await addRemoveFavoriteBook({bookId: bookId, actionType: actionType});
            thunkAPI.dispatch(editBookLikeCount({bookId: bookId, actionType: actionType}));
            thunkAPI.dispatch(editFavoriteBooks({bookId: bookId, actionType: actionType, userId: userId}));
            return {status: response.status, bookId: response.bookId, actionType: actionType};
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to add/removeFavoriteBook");
        }
    }
);