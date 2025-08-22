import type {Author} from "../../types/Author.ts";
import type {City} from "../../types/City.ts";
import BookCardSmall from "../bookCardSmall/BookCardSmall.tsx";
import type {Book} from "../../types/Book.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store.ts";
import type {User} from "../../types/User.ts";
import styles from "./FavoriteBooks.module.css"
import {ROUTES} from "../../constants.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getUserFavoritesThunk} from "../../features/books/booksThunks.ts";

type FavoriteBooksProps = {
    userId: string
};

const FavoriteBooks = ({userId}: FavoriteBooksProps) => {
    const users: User[] = useSelector((state: RootState) => state.users.items);
    const books: Book[] = useSelector((state: RootState) => state.books.items);
    const authors = useSelector((state: RootState) => state.authors.items);
    const cities = useSelector((state: RootState) => state.cities.items);
    const dispatch = useDispatch<AppDispatch>();

    const user = users.find(u => u.userId === userId);
    const favoriteUserBooks = books.filter((book) => user?.favoriteBookIds.includes(book.id)).slice(0, 4);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) dispatch(getUserFavoritesThunk(user.userId));
    }, [user, dispatch]);

    if (!user) return null;

    return (
        <div className={styles.favoriteBooksContainer}>
            <div className={styles.titleContainer}>
                <div className={styles.title}>My favorite books</div>
                <button className={styles.buttonSee} onClick={() => navigate(ROUTES.FAVORITES)}>See all</button>
            </div>
            {favoriteUserBooks.length === 0 &&
                <div className={styles.notBooks}>No books yet. Add some to see them here!</div>}
            <div className={styles.favoriteBooksList}>
                {favoriteUserBooks.map((book) => {
                    const bookAuthors = authors.filter((author: Author) =>
                        book.authorIds.includes(author.id)
                    );
                    const bookCity = cities.find((city: City) => book.cityId === city.id) ?? null;
                    return (
                        <BookCardSmall
                            key={book.id}
                            book={book}
                            authors={bookAuthors}
                            city={bookCity}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FavoriteBooks;