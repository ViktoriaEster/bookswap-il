import type {Request, Response} from "express";
import {Book, BookCreateInput} from "../types/Book";
import {Router} from "express";
import {mockBooks} from "../data/mockBooks"
import {mockUsers as users} from "../data/mockUsers";

import {
    findBookAndIndexById,
    generateBookId, isBookNew,
    validateBook,
    validateBookUpdate
} from "../utils/booksUtils";
import {AuthenticatedRequest} from "../types/express/AuthRequest";
import {User} from "../types/User";


const booksRouter = Router();
const books = mockBooks.map((mockBook: Book): Book => ({
    ...mockBook, isNew: isBookNew(mockBook.createdDate)
}));


// Get books methods
// get books
booksRouter.get("/", (req: Request, res: Response<Book[] | { error: string }>) => {
    if (!books) return res.status(404).json({error: 'Books not found'});
    res.status(200).json(books);
});

// get active books
booksRouter.get("/status/active", (req: Request, res: Response<Book[] | { error: string }>) => {
    const activeBooks = books.filter((book: Book) => book.status === "active");
    if (!activeBooks.length) return res.status(404).json({error: 'Books not found'});
    res.status(200).json(activeBooks);
});

//get books by author
booksRouter.get("/author/:id", (req: Request, res: Response<Book[] | { error: string }>) => {
    const authorId = req.params.id;
    const authorBooks = books.filter((book: Book) => book.authorIds.includes(authorId));
    if (!authorBooks.length) {
        return res.status(404).json({error: 'Books not found'})
    }
    res.status(200).json(authorBooks);
})
//get books by city
booksRouter.get("/city/:id", (req: Request, res: Response<Book[] | { error: string }>) => {
    const cityId = req.params.id;
    const cityBooks = books.filter((book: Book) => book.cityId === cityId);
    if (!cityBooks.length) {
        return res.status(404).json({error: 'Books not found'})
    }
    res.status(200).json(cityBooks);
});

//get books by genre
booksRouter.get("genre/:id", (req: Request, res: Response<Book[] | { error: string }>) => {
    const genreId = req.params.id;
    const genreBooks = books.filter((book: Book) => book.genreId === genreId);
    if (!genreBooks.length) return res.status(404).json({error: 'Books not found'})
    res.status(200).json(genreBooks);
});

//get new books (for home page)
booksRouter.get("/new", (req: Request, res: Response<Book[] | { error: string }>) => {
    const booksForPosts = [...books]
        .sort((a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate))
        .splice(0, 19);
    if (!booksForPosts.length) return res.status(404).json({error: 'Books not found'})
    res.status(200).json(booksForPosts);
});


//get book from id
booksRouter.get("/:id", (req: Request<{ id: string }>, res: Response<Book | { error: string }>) => {
    const bookId = req.params.id;
    const {book, index} = findBookAndIndexById(bookId);
    if (index === -1) {
        return res.status(404).json({error: "Book not found"});
    }
    res.status(200).json(book);
});

//get owners books
booksRouter.get("/owner/:id", (req: AuthenticatedRequest, res: Response<Book[] | { error: string }>) => {
    const ownerId = req.params.id;
    const ownerBooks: Book[] = books.filter((book: Book) => book.ownerId === ownerId);
    if (!ownerBooks.length) {
        return res.status(404).json({error: "No books found"});
    }
    res.status(200).json(ownerBooks);
});

//get user favorite books
booksRouter.get("/favorites/:id", (req: AuthenticatedRequest, res: Response<Book[] | { error: string }>) => {
    const userId = req.params.id;
    const bookIds = users.find((user: User) => user.userId === userId)?.favoriteBookIds;
    if (!bookIds) {
        return res.status(404).json({error: "User not found"});
    }
    const favorites = books.filter((book: Book) => bookIds.includes(book.id));
    if (favorites.length === 0) {
        return res.status(404).json({error: "Book not found"});
    }
    res.status(200).json(favorites);
});

//Post books methods
//Create new book
booksRouter.post("/", (req: Request<{}, {}, BookCreateInput>, res: Response<Book | { error: string }>) => {
    const bookData = req.body;
    const newBook: Book = {
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
        viewsCount: 0,
        favoritesCount: 0,
        description: bookData.description,
        condition: bookData.condition,
        createdDate: (new Date()).toISOString(),
        isNew: true
    };
    const validationError = validateBook(newBook);
    if (validationError) {
        return res.status(400).json({error: validationError});
    }
    newBook.id = generateBookId();
    books.push(newBook);
    res.status(201).json(newBook);
});

// Edit book (partial update)
booksRouter.put("/:id", (req: Request<{ id: string }, {}, Partial<Book>>, res: Response<Book | { error: string }>) => {
    const bookId = req.params.id;
    const {book, index} = findBookAndIndexById(bookId);
    if (index === -1) {
        return res.status(404).json({error: "Book not found"});
    }
    const validationError = validateBookUpdate(req.body);
    if (validationError) {
        return res.status(400).json({error: validationError});
    }
    const updatedBook = {...book, ...req.body, id: bookId, isNew: isBookNew(book.createdDate)};
    books[index] = updatedBook;
    res.status(201).json(updatedBook);
});

//Update view count
booksRouter.patch("/view/:id", (req: Request<{ id: string }>, res: Response<{ status: string, bookId: string } | {
    error: string
}>) => {
    const bookId = req.params.id;
    const {index} = findBookAndIndexById(bookId);
    if (index === -1) {
        return res.status(404).json({error: "Book not found"});
    } else books[index].viewsCount += 1;
    res.status(200).json({status: 'success', bookId: bookId});
});

// Update book status (active/archived)
booksRouter.patch("/status/:id", (req: Request<{ id: string }, {}, {
    status: "active" | "archived"
}>, res: Response<Book | { error: string }>) => {
    const bookId = req.params.id;
    const {status} = req.body;
    const {book, index} = findBookAndIndexById(bookId);
    if (index === -1) {
        return res.status(404).json({error: "Book not found"});
    }
    books[index] = {...book, status};
    res.status(200).json(books[index]);
});

//Delete book
booksRouter.delete("/:id", (req: Request<{ id: string }>, res: Response<{ message: string } | { error: string }>) => {
    const bookId = req.params.id;
    const {index} = findBookAndIndexById(bookId);
    if (index === -1) {
        return res.status(404).json({error: "Book not found"});
    }
    books.splice(index, 1);
    res.status(200).json({message: `Book id:${bookId} deleted`});
});

export default booksRouter;