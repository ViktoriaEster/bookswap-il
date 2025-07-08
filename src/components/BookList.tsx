import {useSelector} from "react-redux";
import type {RootState} from "../app/store.ts";
import BookCardSmall from "./BookCardSmall.tsx";

// interface BookListProps {
//     userId: string;
// }

const BookList = () => {

    const books = useSelector((state: RootState) => state.books.items);

    return (
        <div>
            {books.map((book) => <BookCardSmall key={book.id} book={book} />)}
        </div>
    );
};

export default BookList;
