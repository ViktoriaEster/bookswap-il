export const ROUTES = {
    HOME: '/',
    GENRES: '/genres',
    AUTHORS: '/authors',
    CITIES: '/cities',
    BOOK: '/book',

};

export const BOOK_LIST_TYPES = {
    GENRES: 'booksByGenres',
    AUTHORS: 'booksByAuthors',
    CITIES: 'booksByCities',
}

export type BookListType = typeof BOOK_LIST_TYPES[keyof typeof BOOK_LIST_TYPES];