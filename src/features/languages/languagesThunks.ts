import {createAsyncThunk} from "@reduxjs/toolkit";
import type {Language} from "../../types/Language.ts";
import {getLanguageById, getLanguages} from "../../api/languagesApi.ts";

export const getLanguagesThunk = createAsyncThunk<Language[], void, {rejectValue: string}>(
    'languages/getLanguages',
    async (_, thunkAPI) => {
        try {
            return await getLanguages();
        } catch (error: any) {
            console.error(error);
           return thunkAPI.rejectWithValue(error.message || 'Unable to get languages');
        }
    }
);

export const getLanguageByIdThunk = createAsyncThunk<Language, string, {rejectValue: string}>(
    'languages/getLanguageById',
    async (id: string, thunkAPI) => {
        try {
            return await getLanguageById(id);
        }
        catch (error: any) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || 'Unable to get languages');
        }
    }
);