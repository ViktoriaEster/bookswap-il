import {axiosInstance} from "./instance.ts";
import type {Book, BookStatus, BookUpdateInput} from "../types/Book.ts";
import type {BookCreateInput} from "../types/Book.ts";

export const getBooks = async (): Promise<Book[]> => {
    try {
        const response = await axiosInstance.get<Book[]>('/books');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting books");
    }
};

export const getActiveBooks = async (): Promise<Book[]> => {
    try {
        const response = await axiosInstance.get<Book[]>('/books/active');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting active books");
    }
};

export const getBookById = async (id: string): Promise<Book> => {
    try {
        const response = await axiosInstance.get<Book>(`/books/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting book");
    }
};

export const getOwnerBooksById = async (id: string): Promise<Book[]> => {
    try {
        const response = await axiosInstance.get<Book[]>(`/books/owner/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting owner books");
    }
};

export const createBook = async (book: BookCreateInput): Promise<Book> => {
    try {
        const response = await axiosInstance.post<Book>(`/books`, book);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating book");
    }
};

export const editBook = async (id: string, updateBook: BookUpdateInput): Promise<Book> => {
    const response = await axiosInstance.put<Book>(`/books/${id}`, updateBook);
    return response.data;
};

export const updateBookStatus = async (id: string, status: BookStatus): Promise<Book> => {
    try {
        const response = await axiosInstance.put<Book>(`/books/status/${id}`, status);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error updating book");
    }
};

export const deleteBook = async (id: string): Promise<{message: string}> => {
    try {
        const response = await axiosInstance.delete<{message: string}>(`/books/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error deleting book");
    }
};





