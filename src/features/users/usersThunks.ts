import {createAsyncThunk} from "@reduxjs/toolkit";
import {deleteUser, editUser, getUser, getUsers} from "../../api/usersApi";
import type {User, UserInput} from "../../types/User";
import {addUser}  from "../../api/usersApi.ts"

export const getUsersThunk = createAsyncThunk <User[], void, {rejectValue: string}>(
    "users/getUsers",
    async (_, thunkAPI) => {
        try {
            return await getUsers();
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch users");
        }
    }
);

export const getUserThunk = createAsyncThunk<User, string, {rejectValue: string}>(
    "users/getUser",
    async (id, thunkAPI) => {
        try {
            return await getUser(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch user");
        }
    }
);

export const addUserThunk = createAsyncThunk<User, UserInput, {rejectValue: string}>(
    "users/addUser",
    async (userData: UserInput, thunkAPI) => {
        try {
            return await addUser(userData);
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to add user");
        }
    }
);

export const editUserThunk = createAsyncThunk<User, {id: string, userData: UserInput}, {rejectValue: string}>(
    "users/editUser",
    async ({id, userData}, thunkAPI) => {
        try {
            return await editUser(id, userData);
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to edit");
        }
    }
);

export const deleteUserThunk = createAsyncThunk<{message:string, id:string}, {id: string}, {rejectValue: string}>(
    "users/deleteUser",
    async ({id}, thunkAPI) => {
        try {
            return await deleteUser(id);
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to delete");
        }
    }
);

