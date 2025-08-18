import type {User} from "../../types/User.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {
    addUserThunk,
    deleteUserThunk,
    editUserThunk,
    getUsersThunk,
    getUserThunk
} from "./usersThunks.ts";


type UsersState = {
    isLoading: boolean;
    error: null | string;
    items: User[]
};

const initialState: UsersState = {
    isLoading: false,
    error: null,
    items: []
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            //getUsersThunk
            .addCase(getUsersThunk.pending, (state: UsersState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUsersThunk.fulfilled, (state: UsersState, action: PayloadAction<User[]>) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload;
            })
            .addCase(getUsersThunk.rejected, (state: UsersState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to getting users';
            })
            //getUserThunk
            .addCase(getUserThunk.pending, (state: UsersState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserThunk.fulfilled, (state: UsersState, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.error = null;
                const index: number = state.items.findIndex((user: User) => user.userId === action.payload.userId);
                if (index === -1) state.items.push(action.payload);
                else {
                    state.items [index] = action.payload;
                }
            })
            .addCase(getUserThunk.rejected, (state: UsersState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to getting user';
            })
            //addUserThunk
            .addCase(addUserThunk.pending, (state: UsersState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addUserThunk.fulfilled, (state: UsersState, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.error = null;
                state.items.push(action.payload);
            })
            .addCase(addUserThunk.rejected, (state: UsersState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed create user';
            })
        //editUserThunk
            .addCase(editUserThunk.pending, (state: UsersState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editUserThunk.fulfilled, (state: UsersState, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.error = null;
                const index: number = state.items.findIndex((user: User) => user.userId === action.payload.userId);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(editUserThunk.rejected, (state: UsersState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to edit user';
            })
            //deleteUserThunk
            .addCase(deleteUserThunk.pending, (state: UsersState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteUserThunk.fulfilled, (state: UsersState, action: PayloadAction<{message: string, id: string}>) => {
                state.isLoading = false;
                state.error = null;
                const index: number = state.items.findIndex((user) => user.userId === action.payload.id);
                if (index !== -1) state.items.splice(index, 1);
            })
            .addCase(deleteUserThunk.rejected, (state: UsersState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete user';
            })
    }
})

export default usersSlice.reducer;