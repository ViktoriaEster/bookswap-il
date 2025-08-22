import {BOOK_LIST_TYPES, type BookListType, MIN_LOCAL} from "../../constants.ts";
import {useDispatch, useSelector} from "react-redux";
import type {Book} from "../../types/Book.ts";
import type {AppDispatch, RootState} from "../../app/store.ts";
import type {Author} from "../../types/Author.ts";
import type {Genre} from "../../types/Genre.ts";
import type {City} from "../../types/City.ts";
import BookCardSmall from "../bookCardSmall/BookCardSmall.tsx";
import styles from "./BookList.module.css";
import { useEffect, useMemo, useState } from "react";
import {
    getAuthorBooksThunk,
    getCityBooksThunk,
    getGenreBooksThunk,
    getUserFavoritesThunk,
    getActiveBooksThunk
} from "../../features/books/booksThunks.ts";



type BookListProps = {
    type: BookListType;
};

const BookList = ({type}: BookListProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const books: Book[] = useSelector((state: RootState) => state.books.items);
    const authors = useSelector((state: RootState) => state.authors.items);
    const genres = useSelector((state: RootState) => state.genres.items);
    const cities = useSelector((state: RootState) => state.cities.items);
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    const [activeFilter, setActiveFilter] = useState<string>('');

    const createNavMenuItems = (): Author[] | Genre[] | City[] | null => {
        switch (type) {
            case BOOK_LIST_TYPES.AUTHORS:
                return authors;
            case BOOK_LIST_TYPES.GENRES:
                return genres;
            case BOOK_LIST_TYPES.CITIES:
                return cities;
            default:
                return null;
        }
    };

    const filterBooks = (filterId: string) => {
        if (!filterId) return books;
        switch (type) {
            case BOOK_LIST_TYPES.AUTHORS:
                return books.filter((book: Book) => book.authorIds.includes(filterId));
            case BOOK_LIST_TYPES.GENRES:
                return books.filter(book => book.genreId === filterId);
            case BOOK_LIST_TYPES.CITIES:
                return books.filter((book: Book) => book.cityId === filterId);
            case BOOK_LIST_TYPES.FAVORITES:
                return books.filter((book: Book) => currentUser?.favoriteBookIds.includes(book.id));
            default:
                return books;
        }
    }

    const activeBooks = useMemo(() => filterBooks(activeFilter), [books, activeFilter, type, currentUser]);

    useEffect(() => {
        // FAVORITES: всегда синхронизируем с сервером по пользователю
        if (type === BOOK_LIST_TYPES.FAVORITES) {
            if (currentUser?.userId) {
                dispatch(getUserFavoritesThunk(currentUser.userId));
            }
            return;
        }

        // Без фильтра: берём активные книги с сервера
        if (!activeFilter) {
            dispatch(getActiveBooksThunk());
            return;
        }

        // С фильтром: если локально меньше 10 — добираем с сервера

        const localCount = filterBooks(activeFilter).length;
        if (localCount < MIN_LOCAL) {
            switch (type) {
                case BOOK_LIST_TYPES.AUTHORS:
                    dispatch(getAuthorBooksThunk(activeFilter));
                    break;
                case BOOK_LIST_TYPES.GENRES:
                    dispatch(getGenreBooksThunk(activeFilter));
                    break;
                case BOOK_LIST_TYPES.CITIES:
                    dispatch(getCityBooksThunk(activeFilter));
                    break;
                default:
                    break;
            }
        }
    }, [type, activeFilter, currentUser?.userId, books.length, dispatch]);

    const handleClickFilterBooks = (filterId: string) => {
        const nextFilter = activeFilter === filterId ? '' : filterId;
        setActiveFilter(nextFilter);
    };

    const navMenuItems = createNavMenuItems();

    return (
        <div>
            {type === BOOK_LIST_TYPES.FAVORITES && currentUser &&
                <div className={styles.favoriteBooksTitle}>My favorite books</div>}
            {activeBooks.length === 0 && <div className={styles.notBooks}>Nothing here yet...</div>}
            <div className={styles.bookListContainer}>
                {navMenuItems &&
                    <div className={styles.navMenuContainer}>
                        {navMenuItems.map((item: Author | City | Genre) =>
                            <div className={`${styles.navMenuItem} ${activeFilter === item.id ? styles.active : ''}`}
                                 onClick={() => handleClickFilterBooks(item.id)} key={item.id}>{item.name}</div>)}
                    </div>}
                <div className={styles.bookCardsContainer}>
                    {activeBooks.map((book: Book) => {
                        const bookAuthors = authors.filter((author: Author) => book.authorIds.includes(author.id));
                        const bookCity = cities.find((city: City) => book.cityId === city.id) ?? null;
                        return <BookCardSmall key={book.id} book={book} authors={bookAuthors} city={bookCity}/>
                    })}
                </div>
            </div>
        </div>
    );
};

export default BookList;
