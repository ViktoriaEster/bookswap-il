import type { Request, Response } from "express";
import {Book, BookCreateInput} from "../types/Book";
import { Router } from "express";
import { mockBooks as books } from "../data/mockBooks";
import {findBookAndIndexById, generateBookId, validateBook, validateBookUpdate} from "../utils/booksUtils";

const booksRouter = Router();

// Get books methods
// get all books
booksRouter.get("/", (req: Request, res: Response<Book[]>) => {
    res.status(200).json(books);
});

// get all active books
booksRouter.get("/status/active", (req: Request, res: Response<Book[]>) => {
    const activeBooks = books.filter((book: Book) => book.status === "active");
    res.status(200).json(activeBooks);
});

//get book from id
booksRouter.get("/:id", (req: Request<{ id: string }>, res: Response<Book | { error: string }>) => {
    const bookId = req.params.id;
    const {book, index} = findBookAndIndexById(bookId);
    if (index===-1) {
        return res.status(404).json({error: "Book not found"});
    }
    res.status(200).json(book);
});

//get owners books
booksRouter.get("/owner/:id", (req: Request<{ id: string }>, res: Response<Book[] | { error: string }>) => {
    const ownerId = req.params.id;
    const ownerBooks: Book[] = books.filter((book: Book) => book.ownerId === ownerId);
    if (!ownerBooks.length) {
        return res.status(404).json({error: "No books found"});
    }
    res.status(200).json(ownerBooks);
});

//Post books methods
//Create new book
booksRouter.post("/", (req: Request<{}, {}, BookCreateInput>, res: Response<Book | {error: string}>) => {
    const bookData = req.body;
    const newBook:Book = {
        id: '',
        title: bookData.title,
        picture: bookData.picture,
        ownerId: bookData.ownerId,
        status: "active",
        authorIds: bookData.authorIds,
        genreId: bookData.genreId,
        languageId: bookData.languageId,
        cityId: bookData.cityId,
        offerType: bookData.offerType,
        likesCount: 0,
        viewsCount: 0,
        favoritesCount: 0,
        description: bookData.description,
        condition: bookData.condition,
    };
    const validationError = validateBook(newBook);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }
    newBook.id = generateBookId();
    books.push(newBook);
    res.status(201).json(newBook);
});

// Edit book (partial update)
booksRouter.put("/:id", (req: Request<{ id: string }, {}, Partial<Book>>, res: Response<Book | { error: string }>) => {
    const bookId = req.params.id;
    const {book, index} = findBookAndIndexById(bookId);
    if (index===-1) {
        return res.status(404).json({error: "Book not found"});
    }
    const validationError = validateBookUpdate(req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }
   const updatedBook = { ...book, ...req.body, id: bookId };
    books[index] = updatedBook;
    res.status(201).json(updatedBook);
});

// Update book status (active/archived)
booksRouter.patch("/status/:id", (req: Request<{ id: string }, {}, { status: "active" | "archived" }>, res: Response<Book | { error: string }>) => {
    const bookId = req.params.id;
    const { status } = req.body;
    const {book, index} = findBookAndIndexById(bookId);
    if (index === -1) {
        return res.status(404).json({ error: "Book not found" });
    }
    books[index] = { ...book, status };
    res.status(200).json(books[index]);
});

//Delete book
booksRouter.delete("/:id", (req: Request<{ id: string }>, res: Response<{message: string} | { error: string }>) => {
    const bookId = req.params.id;
    const {index} = findBookAndIndexById(bookId);
    if (index===-1) {
        return res.status(404).json({error: "Book not found"});
    }
    books.splice(index, 1);
    res.status(200).json({message:`Book id:${bookId} deleted`});
});

export default booksRouter;