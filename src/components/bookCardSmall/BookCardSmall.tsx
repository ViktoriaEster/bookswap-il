import type {Book} from "../../types/Book.ts";
import type {Author} from "../../types/Author.ts";
import type {City} from "../../types/City.ts";
import styles from "./BookCardSmall.module.css";
import bookAlt from "../../assets/bookAlt.png";
import {useNavigate} from "react-router-dom";

type BookCardSmallProps = {
    book: Book;
    authors: Author[];
    city: City | null;
};

const BookCardSmall = ({book, authors, city}: BookCardSmallProps) => {
    const navigate = useNavigate();

    return (
        <div className={styles.bookCardContainer}>
            {book.isNew && <div className={styles.newBadge}>NEW</div>}

            <img
                src={book.picture || bookAlt}
                alt={book.title}
                className={styles.bookImage}
            />

            <div className={styles.contentWrapper}>
                <div className={styles.bookTitle}>{book.title}</div>

                <div className={styles.bookText}>
                    {authors.length > 1 ? "Authors" : "Author"}:{" "}
                    {authors.length > 0 ? authors.map((a) => a.name).join(", ") : "Unknown"}
                </div>
            </div>

            <div className={styles.locationOffer}>
                <span className={styles.city}>{city?.name}</span>
                <span className={styles.offerType}>{book.offerType}</span>
            </div>

            <div className={styles.stats}>
                <span>👁 {book.viewsCount}</span>
                <span>❤️ {book.likesCount}</span>
            </div>

            <button className={styles.moreButton} onClick={() => navigate(`/book/${book.id}`)}>More details</button>
        </div>
    );
};

export default BookCardSmall;