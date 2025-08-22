import {createAsyncThunk} from "@reduxjs/toolkit";
import type {Book, BookCreateInput, BookStatus} from "../../types/Book.ts";
import {
    createBook,
    deleteBook,
    editBook,
    getActiveBooks, getAuthorBooks,
    getBookById,
    getBooks, getCityBooks, getGenreBooks, getNewBooks,
    getOwnerBooksById, getUserFavorites, updateBookStatus, updateBookViewsCount
} from "../../api/booksApi.ts";

export const getBooksThunk = createAsyncThunk<Book[], void, { rejectValue: string }>(
    "books/getBooks",
    async (_, thunkAPI) => {
        try {
            return await getBooks();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch books");
        }
    }
);

export const getActiveBooksThunk = createAsyncThunk<Book[], void, { rejectValue: string }>(
    "books/getActiveBooks",
    async (_, thunkAPI) => {
        try {
            return await getActiveBooks();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch books");
        }
    }
);

export const getBookByIdThunk = createAsyncThunk<Book, string, { rejectValue: string }>(
    "books/getBookById",
    async (id: string, thunkAPI) => {
        try {
            return await getBookById(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch book");
        }
    }
);

export const getOwnerBooksByIdThunk = createAsyncThunk<Book[], string, { rejectValue: string }>(
    "books/getOwnerBooks",
    async (id: string, thunkAPI) => {
        try {
            return await getOwnerBooksById(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch owner books");
        }
    }
);

export const getUserFavoritesThunk = createAsyncThunk<Book[], string, { rejectValue: string }>(
    "books/getUserFavorites",
    async (userId, thunkAPI) => {
        try {
            return await getUserFavorites(userId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch user favorites");
        }
    }
);

export const getAuthorBooksThunk = createAsyncThunk<Book[], string, { rejectValue: string }>(
    "books/getAuthorBooks",
    async (id, thunkAPI) => {
        try {
            return await getAuthorBooks(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch author books");
        }
    }
);

export const getCityBooksThunk = createAsyncThunk<Book[], string, { rejectValue: string }>(
    "books/getCityBooks",
    async (id, thunkAPI) => {
        try {
            return await getCityBooks(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch city books");
        }
    }
);

export const getGenreBooksThunk = createAsyncThunk<Book[], string, { rejectValue: string }>(
    "books/getGenreBooks",
    async (id, thunkAPI) => {
        try {
            return await getGenreBooks(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch genre books");
        }
    }
);

export const getNewBooksThunk = createAsyncThunk<Book[], void, { rejectValue: string }>(
    "books/getNewBooks",
    async (_, thunkAPI) => {
        try {
            return await getNewBooks();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch new books");
        }
    }
);

export const createBookThunk = createAsyncThunk<Book, BookCreateInput, { rejectValue: string }>(
    "books/createBook",
    async (newBook: BookCreateInput, thunkAPI) => {
        try {
            return await createBook(newBook);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to create book");
        }
    }
);

export const editBookThunk = createAsyncThunk<Book, { id: string; updateBook: BookCreateInput }, {
    rejectValue: string
}>
("books/editBook",
    async ({id, updateBook}, thunkAPI) => {
        try {
            return await editBook(id, updateBook);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to edit book");
        }
    }
);

export const updateBookViewsCountThunk = createAsyncThunk<{ status: string, bookId: string }, string, {
    rejectValue: string
}>(
    "books/updateBookViewsCount",
    async (id: string, thunkAPI) => {
        try {
            return await updateBookViewsCount(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to add views");
        }
    }
);

export const updateBookStatusThunk = createAsyncThunk<Book, { id: string, status: BookStatus }, {
    rejectValue: string
}>(
    "books/updateBookStatus",
    async ({id, status}, thunkAPI) => {
        try {
            return await updateBookStatus(id, status);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to update book");
        }
    }
)

export const deleteBookThunk = createAsyncThunk<{ message: string, id: string }, string, { rejectValue: string }>(
    "books/deleteBook",
    async (id: string, thunkAPI) => {
        try {
            return await deleteBook(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to delete book");
        }
    }
);

