import type {Author} from "../../types/Author.ts";
import type {City} from "../../types/City.ts";
import BookCardSmall from "../bookCardSmall/BookCardSmall.tsx";
import type {Book} from "../../types/Book.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../../app/store.ts";
import type {PrivateUser} from "../../types/User.ts";

type MyBooksProps = {
    currentUser: PrivateUser;
}

const MyBooks = ({currentUser}: MyBooksProps) => {
    const books: Book[] = useSelector((state: RootState) => state.books.items);
    const authors = useSelector((state: RootState) => state.authors.items);
    // const genres = useSelector((state: RootState) => state.genres.items);
    const cities = useSelector((state: RootState) => state.cities.items);

    const myBooks = books.filter((book) => book.ownerId === currentUser.userId);


    return (
        <div>
            <h3>My books</h3>
            <div>
                {myBooks.map((book) => {
                    const bookAuthors = authors.filter((author: Author) => book.authorIds.includes(author.id));
                    const bookCity = cities.find((city: City) => book.cityId === city.id) ?? null;
                    return <BookCardSmall key={book.id} book={book} authors={bookAuthors} city={bookCity}/>
                })}
            </div>
        </div>
    );
};

export default MyBooks;
