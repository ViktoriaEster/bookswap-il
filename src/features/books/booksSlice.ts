import type {Book} from "../../types/Book.ts";
import {mockBooks} from "../../mock-data/mockBooks.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

type BooksState = {
    items: Book[];
};

const initialState: BooksState = {
    items: mockBooks,
};

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction <Book>) => {
            state.items.push(action.payload);
        },
        removeBook: (state, action: PayloadAction <string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    }
});

export const {addBook, removeBook} = booksSlice.actions;
export default booksSlice.reducer;
