import {createAsyncThunk} from "@reduxjs/toolkit";
import type {PrivateUser} from "../../types/User.ts";
import {getMe, loginUser} from "../../api/authApi.ts";

export const loginUserThunk = createAsyncThunk<{user: PrivateUser, token: string}, {email: string, password: string}, { rejectValue: string }>(
    'auth/loginUser',
    async ({ email, password }, thunkAPI) => {
        try {
            return await loginUser(email, password);
        }
        catch (error: any) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || "Failed to login");
    }}
);

export const getMeThunk = createAsyncThunk<PrivateUser, void, { rejectValue: string }>(
    'auth/getMe',
    async (_, thunkAPI) => {
        try {
           return await getMe();
        }
        catch (error: any) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || "Failed to getting me");
        }
    }
);