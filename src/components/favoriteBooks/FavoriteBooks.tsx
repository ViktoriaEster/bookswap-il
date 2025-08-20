import type {Author} from "../../types/Author.ts";
import type {City} from "../../types/City.ts";
import BookCardSmall from "../bookCardSmall/BookCardSmall.tsx";
import type {Book} from "../../types/Book.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../../app/store.ts";
import type {User} from "../../types/User.ts";

type FavoriteBooksProps = {
    userId: string
};

const FavoriteBooks = ({userId}: FavoriteBooksProps) => {

    const users: User[] = useSelector((state: RootState) => state.users.items);
    const books: Book[] = useSelector((state: RootState) => state.books.items);
    const authors = useSelector((state: RootState) => state.authors.items);
    const cities = useSelector((state: RootState) => state.cities.items);

    const user = users.find(u => u.userId === userId);
    const favoriteUserBooks = books.filter((book) => user?.favoriteBookIds.includes(book.id));

    if (favoriteUserBooks.length <= 0 || !user) return null;

    return (
        <div>
            <h3>My favorite books</h3>
            <div>
                {favoriteUserBooks.map((book) => {
                    const bookAuthors = authors.filter((author: Author) => book.authorIds.includes(author.id));
                    const bookCity = cities.find((city: City) => book.cityId === city.id) ?? null;
                    return <BookCardSmall key={book.id} book={book} authors={bookAuthors} city={bookCity}/>
                })}
            </div>
        </div>
    );
};

export default FavoriteBooks;
