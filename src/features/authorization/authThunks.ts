import {createAsyncThunk} from "@reduxjs/toolkit";
import type {AuthLoginData, PrivateUser} from "../../types/User.ts";
import {getMe, loginUser} from "../../api/authApi.ts";


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