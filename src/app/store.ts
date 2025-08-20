import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';
import usersReducer from '../features/users/usersSlice';
import authorsReducer from '../features/authors/authorsSlice';
import citiesReducer from '../features/cities/citiesSlice';
import languagesReducer from '../features/languages/languagesSlice';
import genreReducer from '../features/genres/genresSlice';
import authReducer from "../features/authorization/authSlice.ts";
import commentsReducer from '../features/comments/commentsSlice';


export const store = configureStore ({
    reducer: {
        books: booksReducer,
        users: usersReducer,
        authors: authorsReducer,
        cities: citiesReducer,
        languages: languagesReducer,
        genres: genreReducer,
        auth: authReducer,
        comments: commentsReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;