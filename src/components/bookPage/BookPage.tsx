import {useParams} from "react-router-dom";
import { useSelector} from "react-redux";
import type { RootState} from "../../app/store.ts";
import styles from "./BookPage.module.css";
import BookCardSmall from "../bookCardSmall/BookCardSmall.tsx";
import type {Author} from "../../types/Author.ts";
import type {City} from "../../types/City.ts";
import BookCard from "../bookCard/BookCard.tsx";

const BookPage = () => {
    const {bookId} = useParams<{ bookId: string }>();
    const books = useSelector((state: RootState) => state.books.items);
    const authors = useSelector((state: RootState) => state.authors.items);
    const genres = useSelector((state: RootState) => state.genres.items);
    const cities = useSelector((state: RootState) => state.cities.items);

    if (!bookId) return <div>Book ID is missing</div>;

    const book = books.find(b => b.id === bookId);
    if (!book) return <div>Book not found</div>;

    const bookGenre = genres.find(genre => genre.id === book.genreId);
    const additionalBooks = books.filter(b => (b.genreId === book.genreId && b.id !== book.id)).slice(0, 4);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.bookCardBigContainer}>
                <div><BookCard id={bookId} isPostView={false}/></div>
                <div>Comments</div>
            </div>
            <aside className={styles.sidebar}>
                <h3>Explore more {bookGenre?.name}</h3>
                <div className={styles.similarBooks}>
                    {additionalBooks.map(b => {
                        const bAuthors = authors.filter((author: Author) => b.authorIds.includes(author.id));
                        const bCity = cities.find((city: City) => b.cityId === city.id) ?? null;
                        return <BookCardSmall key={b.id} book={b} authors={bAuthors} city={bCity}/>
                    })}
                </div>
            </aside>
        </div>
    );
};

export default BookPage;