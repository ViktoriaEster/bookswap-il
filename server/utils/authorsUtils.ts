import {Author} from "../types/Author";
import {mockAuthors as authors} from "../data/mockAuthors"


export const findAuthorAndIndexById = (id: string): { author: Author | null; index: number } => {
    const index = authors.findIndex(a => a.id === id);
    if (index === -1) return {author: null, index: -1};
    return {author: authors[index], index};
};

export const validateNewAuthorName = (newAuthorName: string): string | null => {
    const trimmedName = newAuthorName.trim();

    if (!trimmedName) return "Author name cannot be empty";
    if (trimmedName.length < 5) return "Author name must be at least 5 characters long";

    const nameExists = authors.some(
        a => a.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );
    if (nameExists) return "Author name already exists";

    return null;
};

export const generateAuthorId = (length: number = 3): string => {
    return 'a' + Math.random().toString(5).substring(2, 2 + length);}