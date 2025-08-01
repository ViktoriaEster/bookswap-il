import {createAsyncThunk} from "@reduxjs/toolkit";
import type {Genre} from "../../types/Genre.ts";
import {getGenreById, getGenres} from "../../api/genresApi.ts";

export const getGenresThunk = createAsyncThunk<Genre[], void, {rejectValue: string}>(
    'genres/getGenres',
    async (_, thunkAPI) => {
        try {
            return await getGenres();
        }
        catch (error: any) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || 'Failed to get genres');
        }
    }
);

export const getGenreByIdThunk = createAsyncThunk<Genre, string, {rejectValue: string}>(
    'genres/getGenreById',
    async (id:string, thunkAPI) => {
        try {
            return await getGenreById(id);
        }
        catch (error: any) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || 'Failed to get genre');
        }
    }
);