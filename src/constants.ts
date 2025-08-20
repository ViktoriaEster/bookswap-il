export const ROUTES = {
    HOME: '/',
    GENRES: '/genres',
    AUTHORS: '/authors',
    CITIES: '/cities',
    BOOK: '/book',
    LOGIN: '/login',
    SEARCH: '/search',
    MY_DASHBOARD: '/my-dashboard',
    USER : '/user',
};

export const BOOK_LIST_TYPES = {
    GENRES: 'booksByGenres',
    AUTHORS: 'booksByAuthors',
    CITIES: 'booksByCities',
}

export type BookListType = typeof BOOK_LIST_TYPES[keyof typeof BOOK_LIST_TYPES];