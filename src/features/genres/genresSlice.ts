import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {getGenreByIdThunk, getGenresThunk} from "./genresThunks.ts";
import type {Genre} from "../../types/Genre.ts";

type GenresState = {
    isLoading: boolean;
    error: string | null;
    items: Genre[]
};

const initialState: GenresState = {
    isLoading: false,
    error: null,
    items: []
};


const genreSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            //getGenresThunk
            .addCase(getGenresThunk.pending, (state: GenresState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getGenresThunk.fulfilled, (state: GenresState, action: PayloadAction<Genre[]>) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload;
            })
            .addCase(getGenresThunk.rejected, (state: GenresState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch genres';
            })
            //getGenreByIdThunk
            .addCase(getGenreByIdThunk.pending, (state:GenresState) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getGenreByIdThunk.fulfilled, (state: GenresState, action: PayloadAction<Genre>) => {
            state.isLoading = false;
            state.error = null;
            const index = state.items.findIndex(genre => genre.id === action.payload.id);
            if (index >= 0) state.items[index] = action.payload;
        })
            .addCase(getGenreByIdThunk.rejected, (state: GenresState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch genre';
            })

    }
});

export default genreSlice.reducer;