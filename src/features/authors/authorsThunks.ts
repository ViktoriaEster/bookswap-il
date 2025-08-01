import {createAsyncThunk} from "@reduxjs/toolkit";
import type {Author, AuthorCreateUpdateInput} from "../../types/Author.ts";
import {addAuthor, deleteAuthor, getAuthor, getAuthors} from "../../api/authorsApi.ts";


export const getAuthorsThunk = createAsyncThunk<Author[], void, { rejectValue: string }>(
    'authors/getAuthors',
    async (_, thunkAPI) => {
        try {
            return await getAuthors();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Failed to fetch authors')
        }
    }
);

export const getAuthorThunk = createAsyncThunk<Author, string, { rejectValue: string }>(
    'authors/getAuthor',
    async (id: string, thunkAPI) => {
        try {
            return await getAuthor(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Failed to fetch author');
        }
    }
);

export const addAuthorThunk = createAsyncThunk<Author, AuthorCreateUpdateInput, { rejectValue: string }>(
    'authors/addAuthor',
    async (authorData: AuthorCreateUpdateInput, thunkAPI) => {
        try {
            return await addAuthor(authorData);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Failed to add author');
        }
    }
);

export const deleteAuthorThunk = createAsyncThunk<{message: string, id: string}, string, { rejectValue: string }>(
    'authors/deleteAuthor',
    async (id: string, thunkAPI) => {
        try {
            return await deleteAuthor(id);
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Failed to delete author');
        }
    }
);





