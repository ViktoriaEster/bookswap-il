import type {Book} from "../../types/Book.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {
    createBookThunk,
    deleteBookThunk,
    editBookThunk,
    getActiveBooksThunk, getAuthorBooksThunk,
    getBookByIdThunk,
    getBooksThunk, getCityBooksThunk, getGenreBooksThunk, getNewBooksThunk,
    getOwnerBooksByIdThunk, getUserFavoritesThunk, updateBookStatusThunk, updateBookViewsCountThunk
} from "./booksThunks.ts";
import {mergeBooksByIdUtil} from "./booksUtils.ts";

export type BooksState = {
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
    reducers: {
        editBookLikeCount(state: BooksState, action: PayloadAction<{bookId: string, actionType: 'add' | 'remove'}>) {
            const index = state.items.findIndex(book => book.id === action.payload.bookId);
            if (index >= 0) {
                if (action.payload.actionType==='add') state.items[index].favoritesCount +=1;
                if (action.payload.actionType==='remove') state.items[index].favoritesCount -= 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            //getBooksThunk
            .addCase(getBooksThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getBooksThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload;
            })
            .addCase(getBooksThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch books';
            })
            //getActiveBookThunk
            .addCase(getActiveBooksThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getActiveBooksThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = mergeBooksByIdUtil (state.items, action.payload);
            })
            .addCase(getActiveBooksThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch books';
            })
            //getBookByIdThunk
            .addCase(getBookByIdThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getBookByIdThunk.fulfilled, (state, action) => {
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
            .addCase(getBookByIdThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch books';
            })
            //getOwnerBooksByIdThunk
            .addCase(getOwnerBooksByIdThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOwnerBooksByIdThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = mergeBooksByIdUtil (state.items, action.payload);
            })
            .addCase(getOwnerBooksByIdThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch books';
            })
            //getUserFavoritesThink
            .addCase(getUserFavoritesThunk.pending,state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserFavoritesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = mergeBooksByIdUtil(state.items, action.payload);
            })
            .addCase(getUserFavoritesThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch favorite books';
            })
            //getGenreBooksThunk
            .addCase(getGenreBooksThunk.pending,state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getGenreBooksThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = mergeBooksByIdUtil(state.items, action.payload);
            })
            .addCase(getGenreBooksThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch genre books';
            })
            //getAuthorBooksThunk
            .addCase(getAuthorBooksThunk.pending,state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAuthorBooksThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = mergeBooksByIdUtil(state.items, action.payload);
            })
            .addCase(getAuthorBooksThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch author books';
            })
            //getCityBooksThunk
            .addCase(getCityBooksThunk.pending,state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCityBooksThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = mergeBooksByIdUtil(state.items, action.payload);
            })
            .addCase(getCityBooksThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch city books';
            })
            //getNewBooksThunk
            .addCase(getNewBooksThunk.pending,state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getNewBooksThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = mergeBooksByIdUtil(state.items, action.payload);
            })
            .addCase(getNewBooksThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch city books';
            })
            //createBookThunk
            .addCase(createBookThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createBookThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items.push(action.payload);
            })
            .addCase(createBookThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to create book';
            })
            //editBookThunk
            .addCase(editBookThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editBookThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(book => book.id === action.payload.id);
                if (index>=0) state.items[index] = action.payload;
            })
            .addCase(editBookThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to edit book';
            })
            //updateBookViewsCountThunk
            .addCase(updateBookViewsCountThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateBookViewsCountThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(book => book.id === action.payload.bookId);
                if (index>=0) state.items[index].viewsCount += 1;
            })
            .addCase(updateBookViewsCountThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to update book';
            })
            //updateBookStatusThunk
            .addCase(updateBookStatusThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateBookStatusThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(book => book.id === action.payload.id);
                if (index>=0) state.items[index] = action.payload;
            })
            .addCase(updateBookStatusThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to update book';
            })
            //deleteBookThunk
            .addCase(deleteBookThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteBookThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(book => book.id === action.payload.id);
                if (index >= 0) state.items.splice(index, 1);
                state.items.splice(index, 1);
            })
            .addCase(deleteBookThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete book';
            });
    }
});

export const {editBookLikeCount} = booksSlice.actions;
export default booksSlice.reducer;
