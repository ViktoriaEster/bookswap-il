import styles from "../bookCard/BookCard.module.css";

import {useSelector} from "react-redux";
import type {RootState} from "../../app/store.ts";
import type {Book} from "../../types/Book.ts";


type BookCardProps = {
    id: string;
};


const BookCard = ({id}: BookCardProps) => {
    const books: Book [] = useSelector((state: RootState) => state.books.items);
    const authors = useSelector((state: RootState) => state.authors.items);
    const genres = useSelector((state: RootState) => state.genres.items);
    const cities = useSelector((state: RootState) => state.cities.items);

    const book = books.find(b => b.id === id);
    if (!book) return <div>Book not found</div>;

    const bookAuthors = authors.filter(author => book.authorIds.includes(author.id));
    const bookGenre = genres.find(genre => genre.id === book.genreId);
    const bookCity = cities.find(city => city.id === book.cityId);

    if (!bookGenre || !bookCity || bookAuthors.length === 0) return <div>Book details incomplete</div>;


    return (
        <div>
            <div className={styles.contentContainer}>
                <div className={styles.picContainer}>
                    <img src={book.picture} alt={book.title}/>
                </div>

                <div className={styles.infoContainer}>
                    <h1>{book.title}</h1>
                    <div className={styles.meta}>
                        <span>Author{bookAuthors.length > 1 ? "s" : ""}: {authors.map(a => a.name).join(", ")}</span>
                        <span>Genre: {bookGenre.name}</span>
                        <span>City: {bookCity.name}</span>
                        <span>Condition: {book.condition}</span>
                        <span className={styles.offerType}>{book.offerType}</span>
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
        </div>
    );
};

export default BookCard;
