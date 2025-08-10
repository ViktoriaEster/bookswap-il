export const ROUTES = {
    HOME: '/',
    NEW_BOOKS: '/new-books',
    GENRES: '/genres',
    AUTHORS: '/authors',
    CITIES: '/cities',
    BOOK: '/book',

};

export const BOOK_LIST_TYPES = {
    NEW_BOOKS: 'newBooks',
    GENRES: 'booksByGenres',
    AUTHORS: 'booksByAuthors',
    CITIES: 'booksByCities',
}

export type BookListType = typeof BOOK_LIST_TYPES[keyof typeof BOOK_LIST_TYPES];