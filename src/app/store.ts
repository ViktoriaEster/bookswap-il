import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';
import usersReducer from '../features/users/usersSlice';
import authorsReducer from '../features/authors/authorsSlice';
import citiesReducer from '../features/cities/citiesSlice';
import languagesReducer from '../features/languages/languagesSlice';
import genreReducer from '../features/genres/genresSlice';


export const store = configureStore ({
    reducer: {
        books: booksReducer,
        users: usersReducer,
        authors: authorsReducer,
        cities: citiesReducer,
        languages: languagesReducer,
        genres: genreReducer,
        // comments: commentsReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;