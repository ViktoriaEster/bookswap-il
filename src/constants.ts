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
    MESSAGES: '/messages',
    FAVORITES: '/favorites',
    PROFILE_EDITOR: '/profile/edit',
    PROFILE_CREATOR: '/profile/create',
};

export const BOOK_LIST_TYPES = {
    GENRES: 'booksByGenres',
    AUTHORS: 'booksByAuthors',
    CITIES: 'booksByCities',
    FAVORITES: 'favoritesBooks',
}

export type BookListType = typeof BOOK_LIST_TYPES[keyof typeof BOOK_LIST_TYPES];

export const MIN_LOCAL = 10;