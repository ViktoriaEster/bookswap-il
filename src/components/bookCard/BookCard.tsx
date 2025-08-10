import styles from "../bookCard/BookCard.module.css";
import type {Genre} from "../../types/Genre.ts";
import type {Author} from "../../types/Author.ts";
import type {Book} from "../../types/Book.ts";
import type {City} from "../../types/City.ts";


type BookCardProps = {
    book: Book;
    authors: Author [];
    genre: Genre;
    city: City;
};


const BookCard = ({book, authors, genre, city}: BookCardProps) => {
    return (
        <div>
            <div className={styles.contentContainer}>
                <div className={styles.picContainer}>
                    <img src={book.picture} alt={book.title}/>
                </div>

                <div className={styles.infoContainer}>
                    <h1>{book.title}</h1>
                    <div className={styles.meta}>
                        <span>Author{authors.length > 1 ? "s" : ""}: {authors.map(a => a.name).join(", ")}</span>
                        <span>Genre: {genre.name}</span>
                        <span>City: {city.name}</span>
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
