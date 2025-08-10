import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import type {RootState} from "../../app/store.ts";
import styles from "./BookCardBig.module.css";
import BookCardSmall from "../bookCardSmall/BookCardSmall.tsx";
import type {Author} from "../../types/Author.ts";
import type {City} from "../../types/City.ts";

const BookCardBig = () => {
    const {bookId} = useParams<{ bookId: string }>();
    const books = useSelector((state: RootState) => state.books.items);
    const authors = useSelector((state: RootState) => state.authors.items);
    const genres = useSelector((state: RootState) => state.genres.items);
    const cities = useSelector((state: RootState) => state.cities.items);

    if (!bookId) return <div>Book ID is missing</div>;

    const book = books.find(b => b.id === bookId);

    if (!book) return <div>Book not found</div>;

    const bookAuthors = authors.filter(author => book.authorIds.includes(author.id));
    const bookGenre = genres.find(genre => genre.id === book.genreId);
    const bookCity = cities.find(city => city.id === book.cityId);

    if (!bookGenre || !bookCity || bookAuthors.length === 0) return <div>Book details incomplete</div>;

    const additionalBooks = books.filter(b => (b.genreId === book.genreId && b.id !== book.id)).slice(0, 4);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.bookCardBigContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.picContainer}>
                        <img src={book.picture} alt={book.title}/>
                    </div>

                    <div className={styles.infoContainer}>
                        <h1>{book.title}</h1>
                        <div className={styles.meta}>
                            <span>Author{bookAuthors.length > 1 ? "s" : ""}: {bookAuthors.map(a => a.name).join(", ")}</span>
                            <span>Genre: {bookGenre.name}</span>
                            <span>City: {bookCity.name}</span>
                            <span>Condition: {book.condition}</span>
                        </div>

                        <div className={styles.buttonRow}>
                            <button className={styles.contactButton}>Contact with owner</button>
                            <button className={styles.favoriteButton}>★ Add to favorites</button>
                        </div>

                        <div className={styles.descriptionBlock}>
                            <h2>Description</h2>
                            <p>{book.description}</p>
                        </div>
                    </div>

                    <div className={styles.statsCorner}>
                        <div className={styles.statItem}>❤️ {book.likesCount}</div>
                        <div className={styles.statItem}>👀 {book.viewsCount}</div>
                    </div>
                </div>
                <div>Comments</div>
            </div>
            <aside className={styles.sidebar}>
                <h3>Explore more {bookGenre.name}</h3>
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

export default BookCardBig;