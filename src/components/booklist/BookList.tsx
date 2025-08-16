import {BOOK_LIST_TYPES, type BookListType} from "../../constants.ts";
import {useSelector} from "react-redux";
import type {Book} from "../../types/Book.ts";
import type {RootState} from "../../app/store.ts";
import type {Author} from "../../types/Author.ts";
import type {Genre} from "../../types/Genre.ts";
import type {City} from "../../types/City.ts";
import BookCardSmall from "../bookCardSmall/BookCardSmall.tsx";
import styles from "./BookList.module.css";
import {useState} from "react";



type BookListProps = {
    type: BookListType;
};

const BookList = ({type}: BookListProps) => {

    const books: Book[] = useSelector((state: RootState) => state.books.items);
    const authors = useSelector((state: RootState) => state.authors.items);
    const genres = useSelector((state: RootState) => state.genres.items);
    const cities = useSelector((state: RootState) => state.cities.items);

    const [activeFilter, setActiveFilter] = useState<string>('');
    const [activeBooks, setActiveBooks] = useState<Book[]>(books);

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
            default:
                return books;
        }
    }

    const handleClickFilterBooks = (filterId: string) => {
        const nextFilter = activeFilter === filterId ? '' : filterId;
        setActiveFilter(nextFilter);
        const newActiveBooks = filterBooks(nextFilter);
        setActiveBooks(newActiveBooks);
    };

    const navMenuItems = createNavMenuItems();

    return (
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
    );
};

export default BookList;
