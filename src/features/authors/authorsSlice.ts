import type {Author} from "../../types/Author.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {addAuthorThunk, deleteAuthorThunk, getAuthorsThunk, getAuthorThunk} from "./authorsThunks.ts";

export type AuthorsState = {
    isLoading: boolean;
    error: null | string;
    items: Author[];
};

const initialState: AuthorsState = {
    isLoading: false,
    error: null,
    items: [],
}

const authorSlice = createSlice({
    name: "authors",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        //getAuthorsThunk
            .addCase(getAuthorsThunk.pending, (state: AuthorsState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAuthorsThunk.fulfilled, (state: AuthorsState, action: PayloadAction<Author[]>) => {
                state.isLoading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(getAuthorsThunk.rejected, (state: AuthorsState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch authors';
            })
        //getAuthorThunk
            .addCase(getAuthorThunk.pending, (state: AuthorsState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAuthorThunk.fulfilled, (state: AuthorsState, action: PayloadAction<Author>) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex((item: Author) => item.id === action.payload.id);
                if (index==-1) state.items.push(action.payload);
                else state.items[index] = action.payload;
            })
            .addCase(getAuthorThunk.rejected, (state: AuthorsState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch author';
            })
        //addAuthorThunk
            .addCase(addAuthorThunk.pending, (state: AuthorsState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addAuthorThunk.fulfilled, (state: AuthorsState, action: PayloadAction<Author>) => {
                state.isLoading = false;
                state.error = null;
                state.items.push(action.payload);
            })
            .addCase(addAuthorThunk.rejected, (state: AuthorsState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to create author';
            })
        //deleteAuthorThunk
            .addCase(deleteAuthorThunk.pending, (state: AuthorsState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteAuthorThunk.fulfilled, (state: AuthorsState, action: PayloadAction<{message: string, id: string}>) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex((item: Author) => item.id === action.payload.id);
                if (index!==-1) state.items.splice(index, 1);
            })
            .addCase(deleteAuthorThunk.rejected, (state: AuthorsState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete author';
            })
    }


});

export default authorSlice.reducer;
