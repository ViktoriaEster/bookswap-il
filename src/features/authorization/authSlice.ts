import type {PrivateUser} from "../../types/User.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {getMeThunk, loginUserThunk} from "./authThunks.ts";


type AuthState = {
    isLogin: boolean;
    currentUser: PrivateUser | null;
    isLoading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    isLogin: false,
    currentUser: null,
    isLoading: false,
    error: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state: AuthState) => {
            state.isLogin = false;
            state.currentUser = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        builder
        //loginUserThunk
            .addCase(loginUserThunk.pending, (state: AuthState,) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUserThunk.fulfilled, (state: AuthState, action: PayloadAction<{user: PrivateUser, token: string}>) => {
                state.isLoading = false;
                state.error = null;
                state.currentUser = action.payload.user;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(loginUserThunk.rejected, (state: AuthState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to login';
            })
        //getMeThunk
            .addCase(getMeThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getMeThunk.fulfilled, (state: AuthState, action: PayloadAction<PrivateUser>) => {
                state.isLoading = false;
                state.error = null;
                state.currentUser = action.payload;
            })
            .addCase(getMeThunk.rejected, (state: AuthState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to get me';
            })
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;