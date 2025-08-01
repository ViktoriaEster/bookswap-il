import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../app/store.ts";
import BookCardSmall from "./BookCardSmall.tsx";
import {useEffect} from "react";
import {addBookAsync, fetchBooks} from "../features/books/booksThunks.ts";
import type {Book} from "../types/Book.ts";

// interface BookListProps {
//     userId: string;
// }

const BookList = () => {

    const dispatch = useDispatch<AppDispatch>();

    const books = useSelector((state: RootState) => state.books.items);
    const isLoading = useSelector((state: RootState)=> state.books.isLoading);
    const error = useSelector((state: RootState)=> state.books.error);

    const mockNewBook: Book = {
        id: 'newBook',
        title: 'New book',
        author: 'New book',
        city: 'Haifa',
        picture: 'New book',
        ownerId: 'u11',
    }
    const handleAddBook = () => {
        dispatch(addBookAsync(mockNewBook))
    }

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    if (isLoading) return <div> 📚 Books is loading...</div>
    if (error) return <div>Error setup books: {error}</div>;

    return (
        <div>
            <div>
                {books.map((book) => <BookCardSmall key={book.id} book={book}/>)}
            </div>
            <div>
                <button onClick={handleAddBook}>Add book</button>
            </div>
        </div>
    );
};

export default BookList;
