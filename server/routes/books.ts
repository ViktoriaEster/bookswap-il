import type { Request, Response } from "express";
import type { Book } from "../types/Book";
import { Router } from "express";
import { mockBooks as books } from "../data/books";

const router = Router();


// Get books methods
// get all books
router.get("/", (req: Request, res: Response<Book[]>) => {
    res.json(books);
});

// get all active books
router.get("/status/active", (req: Request, res: Response<Book[]>) => {
    const activeBooks = books.filter((book: Book) => book.status === "active");
    res.status(200).json(activeBooks);
});

//get book from id
router.get("/:id", (req: Request<{ id: string }>, res: Response<Book | { error: string }>) => {
    const bookId = req.params.id;
    const book: Book | undefined = books.find((book: Book) => book.id === bookId);
    if (!book) {
        res.status(404).json({error: "Book not found"});
    }
    res.status(200).json(book);
});

//get owners books
router.get("/owner/:id", (req: Request<{ id: string }>, res: Response<Book[] | { error: string }>) => {
    const ownerId = req.params.id;
    const ownerBooks: Book[] = books.filter((book: Book) => book.ownerId === ownerId);
    if (!ownerBooks.length) {res.status(404).json({error: "No books found"});}
    res.status(200).json(ownerBooks);
});

//Post books methods
//Create new book
router.post("/", (req: Request<{}, {}, Book>, res: Response<Book>) => {
    const newBook = req.body;
    newBook.id = Date.now().toString();
    books.push(newBook);
    res.status(201).json(newBook);
});

//Edit book
// Edit book (partial update)
router.put("/:id", (req: Request<{ id: string }, {}, Partial<Book>>, res: Response<Book | { error: string }>) => {
    const bookId = req.params.id;
    const index = books.findIndex((book: Book) => book.id === bookId);
    if (index===-1) {res.status(404).json({error: "Book not found"});}
   const updatedBook = { ...books[index], ...req.body, id: bookId };
    books[index] = updatedBook;
    res.status(201).json(updatedBook);
});

// Update book status (active/archived)
router.patch("/status/:id", (req: Request<{ id: string }, {}, { status: "active" | "archived" }>, res: Response<Book | { error: string }>) => {
    const bookId = req.params.id;
    const { status } = req.body;
    const index = books.findIndex((book: Book) => book.id === bookId);
    if (index === -1) {
        return res.status(404).json({ error: "Book not found" });
    }
    books[index] = { ...books[index], status };
    res.status(200).json(books[index]);
});

//Delete book
router.delete("/:id", (req: Request<{ id: string }>, res: Response<string | { error: string }>) => {
    const bookId = req.params.id;
    const index = books.findIndex((book: Book) => book.id === bookId);
    if (index===-1) {return res.status(404).json({error: "Book not found"});}
    books.splice(index, 1);
    res.status(200).json(`Book id:${bookId} deleted`);
});


export default router;