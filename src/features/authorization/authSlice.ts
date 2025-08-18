import type {PrivateUser} from "../../types/User.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {addRemoveFavoriteBookThunk, getMeThunk, loginUserThunk} from "./authThunks.ts";


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
            .addCase(loginUserThunk.fulfilled, (state: AuthState, action: PayloadAction<{token: string}>) => {
                state.isLoading = false;
                state.error = null;
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
                state.isLogin = true;
                state.currentUser = action.payload;
            })
            .addCase(getMeThunk.rejected, (state: AuthState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to get me';
            })
            //add remove favorite book
            .addCase(addRemoveFavoriteBookThunk.pending, (state: AuthState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addRemoveFavoriteBookThunk.fulfilled, (state: AuthState, action: PayloadAction< {status: string, bookId: string, actionType: 'add'| 'remove'}>) => {
                state.isLoading = false;
                state.error = null;
                if (action.payload.actionType === 'add') {
                    state.currentUser?.favoriteBookIds?.push(action.payload.bookId);
                }
                if (action.payload.actionType === 'remove' && state.currentUser?.favoriteBookIds) {
                    state.currentUser.favoriteBookIds = state.currentUser.favoriteBookIds.filter(id => id !== action.payload.bookId);
                }
            })
            .addCase(addRemoveFavoriteBookThunk.rejected, (state: AuthState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to action with favorite book';
            })

    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;