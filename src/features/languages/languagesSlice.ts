import type {Language} from "../../types/Language.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {getLanguageByIdThunk, getLanguagesThunk} from "./languagesThunks.ts";

type LanguageState = {
    isLoading: boolean;
    error: string | null;
    items: Language[]
}

const initialState: LanguageState = {
    isLoading: false,
    error: null,
    items: []
};

const languagesSlice = createSlice({
    name: "languages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //getLanguages
            .addCase(getLanguagesThunk.pending, (state: LanguageState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getLanguagesThunk.fulfilled, (state: LanguageState, action: PayloadAction <Language[]>) => {
                state.isLoading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(getLanguagesThunk.rejected, (state: LanguageState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch languages';
            })
            //getLanguageById
            .addCase(getLanguageByIdThunk.pending, (state: LanguageState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getLanguageByIdThunk.fulfilled, (state: LanguageState, action: PayloadAction<Language>) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex((item: Language) => item.id === action.payload.id);
                if (index !==-1) state.items[index] = action.payload;
            })
            .addCase(getLanguageByIdThunk.rejected, (state: LanguageState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch language';
            })
    }
});

export default languagesSlice.reducer;