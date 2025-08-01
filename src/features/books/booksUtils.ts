import type {Book} from "../../types/Book.ts";

export const mergeBooksByIdUtil = (existing: Book[], incoming: Book[]): Book[] => {
    const incomingMap = new Map(incoming.map(book => [book.id, book]));
    const updated = existing.filter(book => !incomingMap.has(book.id));
    return [...updated, ...incoming];
};

