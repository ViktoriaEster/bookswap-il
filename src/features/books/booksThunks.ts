import {createAsyncThunk} from "@reduxjs/toolkit";
import type {Book, BookCreateInput} from "../../types/Book.ts";
import {
    createBook,
    deleteBook,
    editBook,
    getActiveBooks,
    getBookById,
    getBooks,
    getOwnerBooksById
} from "../../api/booksApi.ts";

export const getBooksThunk = createAsyncThunk<Book[], void, {rejectValue: string}>(
    "books/getBooks",
    async (_, thunkAPI) => {
        try {
            return await getBooks();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch books");
        }
    }
);

export const getActiveBookThunk = createAsyncThunk<Book[], void, {rejectValue: string}>(
    "books/getActiveBook",
    async (_, thunkAPI) => {
        try {
            return await getActiveBooks();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch books");
        }
    }
);

export const getBookByIdThunk = createAsyncThunk<Book, string, {rejectValue: string}>(
    "books/getBookById",
    async (id: string, thunkAPI) => {
        try {
            return await getBookById(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch book");
        }
    }
);

export const getOwnerBooksByIdThunk = createAsyncThunk<Book[], string, {rejectValue: string}>(
    "books/getOwnerBooks",
    async (id: string, thunkAPI) => {
        try {
            return await getOwnerBooksById(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch owner books");
        }
    }
);

export const createBookThunk = createAsyncThunk<Book, BookCreateInput, {rejectValue: string}>(
    "books/createBook",
    async (newBook: BookCreateInput, thunkAPI) => {
        try {
            return await createBook(newBook);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to create book");
        }
    }
);

export const editBookThunk = createAsyncThunk<Book, { id: string; updateBook: BookCreateInput }, {rejectValue: string}>
("books/editBook",
    async ({id, updateBook}, thunkAPI) => {
        try {
            return await editBook(id, updateBook);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to edit book");
        }
    }
);

export const deleteBookThunk = createAsyncThunk<{ message: string, id: string}, string, {rejectValue: string}>(
    "books/deleteBook",
    async (id: string, thunkAPI) => {
        try {
            return await deleteBook(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to delete book");
        }
    }
);

