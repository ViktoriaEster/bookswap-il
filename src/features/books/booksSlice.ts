import type {Book} from "../../types/Book.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {
    createBookThunk,
    deleteBookThunk,
    editBookThunk,
    getActiveBookThunk,
    getBookByIdThunk,
    getBooksThunk,
    getOwnerBooksByIdThunk
} from "./booksThunks.ts";
import {mergeBooksByIdUtil} from "./booksUtils.ts";

type BooksState = {
    items: Book[];
    isLoading: boolean;
    error: string | null;
};

const initialState: BooksState = {
    items: [],
    isLoading: false,
    error: null,
};

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //getBooksThunk
            .addCase(getBooksThunk.pending, (state: BooksState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getBooksThunk.fulfilled, (state: BooksState, action: PayloadAction<Book[]>) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload;
            })
            .addCase(getBooksThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch books';
            })
            //getActiveBookThunk
            .addCase(getActiveBookThunk.pending, (state: BooksState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getActiveBookThunk.fulfilled, (state: BooksState, action: PayloadAction<Book[]>) => {
                state.isLoading = false;
                state.error = null;
                state.items = mergeBooksByIdUtil (state.items, action.payload);
            })
            .addCase(getActiveBookThunk.rejected, (state: BooksState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch books';
            })
            //getBookByIdThunk
            .addCase(getBookByIdThunk.pending, (state: BooksState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getBookByIdThunk.fulfilled, (state: BooksState, action: PayloadAction<Book>) => {
                state.isLoading = false;
                state.error = null;
                const newBook = action.payload;
                const index = state.items.findIndex(book => book.id === newBook.id);
                if (index === -1) {
                    state.items.push(newBook);
                } else {
                    state.items [index] = newBook;
                }
            })
            .addCase(getBookByIdThunk.rejected, (state: BooksState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch books';
            })
            //getOwnerBooksByIdThunk
            .addCase(getOwnerBooksByIdThunk.pending, (state: BooksState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOwnerBooksByIdThunk.fulfilled, (state: BooksState, action: PayloadAction<Book[]>) => {
                state.isLoading = false;
                state.error = null;
                state.items = mergeBooksByIdUtil (state.items, action.payload);
            })
            .addCase(getOwnerBooksByIdThunk.rejected, (state: BooksState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch books';
            })
            //createBookThunk
            .addCase(createBookThunk.pending, (state: BooksState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createBookThunk.fulfilled, (state: BooksState, action: PayloadAction<Book>) => {
                state.isLoading = false;
                state.error = null;
                state.items.push(action.payload);
            })
            .addCase(createBookThunk.rejected, (state: BooksState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to create book';
            })
            //editBookThunk
            .addCase(editBookThunk.pending, (state: BooksState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editBookThunk.fulfilled, (state: BooksState, action: PayloadAction<Book>) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(book => book.id === action.payload.id);
                if (index!==-1) state.items[index] = action.payload;
            })
            .addCase(editBookThunk.rejected, (state: BooksState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to edit book';
            })
            //deleteBookThunk
            .addCase(deleteBookThunk.pending, (state: BooksState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteBookThunk.fulfilled, (state: BooksState, action: PayloadAction<{message: string, id: string}>) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(book => book.id === action.payload.id);
                state.items.slice(index, 1);
            })
            .addCase(deleteBookThunk.rejected, (state: BooksState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete book';
            });
    }
});


export default booksSlice.reducer;
