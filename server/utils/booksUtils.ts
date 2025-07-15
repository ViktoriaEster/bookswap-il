import type {Book} from "../types/Book";
import {mockBooks as books} from "../data/mockBooks";
import { mockGenres as genres } from "../data/mockGenres";

export const findBookAndIndexById = (id: string): { book: Book | null; index: number } => {
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return { book: null, index: -1 };
    return { book: books[index], index };
}

export const validateBook = (book: Partial<Book>): string | null => {
    if (!book.title || typeof book.title !== "string" || book.title.trim() === "") {
        return "Title must be a non-empty string";
    }

    if (!book.ownerId || typeof book.ownerId !== "string") {
        return "Owner ID is required";
    }

    if (!Array.isArray(book.authorIds) || book.authorIds.length === 0) {
        return "Author IDs must be a non-empty array";
    }

    const validGenre = genres.find(g => g.id === book.genreId);
    if (!validGenre) {
        return "Invalid genre ID";
    }

    const validConditions = ["new", "good", "worn"];
    if (!validConditions.includes(book.condition || "")) {
        return "Invalid book condition";
    }

    const validOfferTypes = ["sell", "exchange", "giveaway"];
    if (!validOfferTypes.includes(book.offerType || "")) {
        return "Invalid offer type";
    }
    if (book.offerType === "sell") {
        if (typeof book.price !== "number" || book.price <= 0) {
            return "Price is required and must be a positive number for sell type";
        }
    }
    return null;
}

export const validateBookUpdate = (book: Partial<Book>): string | null  => {
    if ("title" in book && (typeof book.title !== "string" || book.title.trim() === "")) {
        return "Title must be a non-empty string";
    }

    if ("authorIds" in book && (!Array.isArray(book.authorIds) || book.authorIds.length === 0)) {
        return "Author IDs must be a non-empty array";
    }

    if ("genreId" in book) {
        const validGenre = genres.find(g => g.id === book.genreId);
        if (!validGenre) {
            return "Invalid genre ID";
        }
    }

    const validConditions = ["new", "good", "worn"];
    if ("condition" in book && !validConditions.includes(book.condition || "")) {
        return "Invalid book condition";
    }

    const validOfferTypes = ["sell", "exchange", "giveaway"];
    if ("offerType" in book && !validOfferTypes.includes(book.offerType || "")) {
        return "Invalid offer type";
    }

    if (book.offerType === "sell") {
        if ("price" in book && (typeof book.price !== "number" || book.price <= 0)) {
            return "Price must be a positive number for sell type";
        }
    }

    return null;
}

export const generateBookId = (length: number = 8): string => {
    return 'b' + Math.random().toString(36).substring(2, 2 + length);
};