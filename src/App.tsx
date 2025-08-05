import './App.module.css'
import Header from "./components/header/Header.tsx";
import NavBar from "./components/navMenu/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home.tsx";
import BookList from "./components/booklist/BookList.tsx";
import {BOOK_LIST_TYPES, ROUTES} from "./constants.ts";
import styles from "./App.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {getAuthorsThunk} from "./features/authors/authorsThunks.ts";
import {getCitiesThunk} from "./features/cities/citiesThunks.ts";
import {getGenresThunk} from "./features/genres/genresThunks.ts";
import {getLanguagesThunk} from "./features/languages/languagesThunks.ts";
import type {AppDispatch, RootState} from "./app/store.ts";
import {getActiveBooksThunk} from "./features/books/booksThunks.ts";
import {getUsersThunk} from "./features/users/usersThunks.ts";
import Spinner from "./components/spinner/Spinner.tsx";

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getActiveBooksThunk());
        dispatch(getAuthorsThunk());
        dispatch(getCitiesThunk());
        dispatch(getGenresThunk());
        dispatch(getLanguagesThunk());
        dispatch(getUsersThunk());
    }, [dispatch]);

    const isBooksLoading: boolean = useSelector((state: RootState) => state.books.isLoading);
    const isAuthorsLoading: boolean = useSelector((state: RootState) => state.authors.isLoading);
    const isGenresLoading: boolean = useSelector((state: RootState) => state.genres.isLoading);
    const isCitiesLoading: boolean = useSelector((state: RootState) => state.cities.isLoading);
    const isUsersLoading: boolean = useSelector((state: RootState) => state.users.isLoading);

    const isAppLoading = isBooksLoading || isAuthorsLoading || isGenresLoading || isCitiesLoading || isUsersLoading;

    return (
        <div className={styles.appContainer}>
            <div className={styles.header}><Header/></div>
            <div className={styles.navbar}><NavBar/></div>
            <div className={styles.pageContent}></div>
            { isAppLoading?
             <div className={styles.loader}><Spinner /></div>
            :<Routes>
                <Route path={ROUTES.HOME} element={<Home/>}/>
                <Route path={ROUTES.NEW_BOOKS} element={<BookList type={BOOK_LIST_TYPES.NEW_BOOKS}/>}/>
                <Route path={ROUTES.GENRES} element={<BookList type={BOOK_LIST_TYPES.GENRES}/>}/>
                <Route path={ROUTES.AUTHORS} element={<BookList type={BOOK_LIST_TYPES.AUTHORS}/>}/>
                <Route path={ROUTES.CITIES} element={<BookList type={BOOK_LIST_TYPES.CITIES}/>}/>
            </Routes>
            }
        </div>
    )
}

export default App
