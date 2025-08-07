import type {Book} from "../../types/Book.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../../app/store.ts";
import type {Author} from "../../types/Author.ts";
import type {City} from "../../types/City.ts";
import styles from "./BookCardSmall.module.css";
import bookAlt from "../../assets/bookAlt.png";

type BookCardSmallProps = {
    book: Book;
};

const BookCardSmall = ({book}: BookCardSmallProps) => {
    const authors: Author[] = useSelector((state: RootState) =>
        state.authors.items.filter((author) => book.authorIds.includes(author.id))
    );
    const city: City | undefined = useSelector((state: RootState) =>
        state.cities.items.find((city) => city.id === book.cityId)
    );


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

            <button className={styles.moreButton}>More details</button>
        </div>
    );
};

export default BookCardSmall;