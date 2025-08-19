import type {Book} from "../../types/Book.ts";
import type {Author} from "../../types/Author.ts";
import type {City} from "../../types/City.ts";
import styles from "./BookCardSmall.module.css";
import bookAlt from "../../assets/bookAlt.png";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants.ts";
import {updateBookViewsCountThunk} from "../../features/books/booksThunks.ts";
import type {AppDispatch} from "../../app/store.ts";
import {useDispatch} from "react-redux";

type BookCardSmallProps = {
    book: Book;
    authors: Author[];
    city: City | null;
};

const BookCardSmall = ({book, authors, city}: BookCardSmallProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleBookDetails = () => {
        dispatch(updateBookViewsCountThunk(book.id))
        navigate(`${ROUTES.BOOK}/${book.id}`);
    };

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

            <button className={styles.moreButton} onClick={handleBookDetails}>More details</button>
        </div>
    );
};

export default BookCardSmall;