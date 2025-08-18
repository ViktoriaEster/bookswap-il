import {createAsyncThunk} from "@reduxjs/toolkit";
import type {AuthLoginData, PrivateUser} from "../../types/User.ts";
import {getMe, loginUser} from "../../api/authApi.ts";
import {addRemoveFavoriteBook} from "../../api/usersApi.ts";


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

export const addRemoveFavoriteBookThunk = createAsyncThunk<{status: string, bookId: string, actionType: 'add' | 'remove'} , {bookId: string, actionType:'add'| 'remove'}, {rejectValue: string}>(
    "users/addRemoveFavoriteBook",
    async ({bookId, actionType}, thunkAPI) => {
        try {
            const response = await addRemoveFavoriteBook({bookId: bookId, actionType: actionType});
            return {status: response.status, bookId: response.bookId, actionType: actionType};
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to add/removeFavoriteBook");
        }
    }
);