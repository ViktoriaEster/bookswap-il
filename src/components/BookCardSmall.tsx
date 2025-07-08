import type {Book} from "../types/Book.ts";

type BookCardSmallProps = {
    book: Book;
};


const BookCardSmall = ({book} :BookCardSmallProps) => {
    return (
        <div>
            <div>{book.title}</div>
        </div>
    );
};


export default BookCardSmall;
