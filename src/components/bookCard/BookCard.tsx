import styles from "../bookCard/BookCard.module.css";

import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store.ts";
import type {Book} from "../../types/Book.ts";
import {addRemoveFavoriteBookThunk} from "../../features/authorization/authThunks.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants.ts";

type BookCardProps = {
    id: string;
    isPostView: boolean;
};


const BookCard = ({id, isPostView}: BookCardProps) => {
    const books: Book [] = useSelector((state: RootState) => state.books.items);
    const authors = useSelector((state: RootState) => state.authors.items);
    const genres = useSelector((state: RootState) => state.genres.items);
    const cities = useSelector((state: RootState) => state.cities.items);
    const {currentUser, isLogin} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();


    const book = books.find(b => b.id === id);
    if (!book) return <div>Book not found</div>;

    const bookAuthors = authors.filter(author => book.authorIds.includes(author.id));
    const bookGenre = genres.find(genre => genre.id === book.genreId);
    const bookCity = cities.find(city => city.id === book.cityId);

    const isFavorite = currentUser?.favoriteBookIds.includes(book.id) ?? false;
    const navigate = useNavigate();

    if (!bookGenre || !bookCity || bookAuthors.length === 0) return <div>Book details incomplete</div>;

    const handleAddToFavorite = () => {
        const actionType: 'add' | 'remove' = isFavorite ? 'remove' : "add";
        if (currentUser) dispatch(addRemoveFavoriteBookThunk({
            bookId: book.id,
            actionType: actionType,
            userId: currentUser.userId
        }));
    };

    const handleContact = () => {
        navigate(`${ROUTES.USER}/${book.ownerId}`)
    }

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

                    {(isLogin && currentUser && !isPostView) &&
                        <div className={styles.buttonRow}>
                            <button className={styles.contactButton} onClick={handleContact}>Contact with owner</button>
                            <button className={
                                `${styles.favoriteButton} ${isFavorite ? styles.inFavorite : ""}`}
                                    onClick={handleAddToFavorite}>
                                {!isFavorite ? '★ Add to favorites' : '★ In favorites books'}
                            </button>
                        </div>}
                    {!isLogin &&
                        <div className={styles.message}>Please login to contact with owner</div>
                    }
                    {
                        (!isPostView) &&
                        <div className={styles.descriptionBlock}>
                        <h2>Description</h2>
                        <p>{book.description}</p>
                    </div>}
                </div>

                <div className={styles.statsCorner}>
                    <div className={styles.statItem}>⭐ {book.favoritesCount}</div>
                    <div className={styles.statItem}>👀 {book.viewsCount}</div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
