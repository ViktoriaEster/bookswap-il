import BookCard from "../../bookCard/BookCard.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../app/store.ts";
import type {User} from "../../../types/User.ts";
import styles from "./Post.module.css"
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../constants.ts";
import {updateBookViewsCountThunk} from "../../../features/books/booksThunks.ts";

type PostProps = {
    bookId: string;
    userId: string;
    date: string;
}

const Post = ({bookId, userId, date}: PostProps) => {

    const users: User [] = useSelector((state: RootState) => state.users.items);
    const user: User | undefined = users.find((user) => user.userId === userId);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const books = useSelector((state: RootState) => state.books.items);
    const cities = useSelector((state: RootState) => state.cities.items);

    const book = books.find((book) => book.id === bookId);
    const bookCity = cities.find((city) => city.id === book?.cityId);

    const handleBookDetails = () => {
        dispatch(updateBookViewsCountThunk(bookId))
        navigate(`${ROUTES.BOOK}/${bookId}`);
    };

    return (
        <div className={styles.postContainer}>
            <div className={styles.postHeader}>
                <span className={styles.userName}>{user?.name || 'Unknown User'}</span>
                <span className={styles.actionText}>added a new book</span>
                <span className={styles.postDate}>{new Date(date).toLocaleDateString()}</span>
            </div>
            <div className={styles.postContent}>
                <BookCard id={bookId} isPostView={true}/>
            </div>
            <div className={styles.postFooter}>
                {bookCity && <div className={styles.bookLocationText}>Available in {bookCity.name}</div>}
                <button className={styles.detailsButton} onClick={handleBookDetails}>
                    📖 Explore book
                </button>
            </div>
        </div>
    );
};

export default Post;
