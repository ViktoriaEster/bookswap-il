import { Genre } from "../types/Genre";
import { mockGenres as genres } from "../data/mockGenres";

export const findGenreById = (id: string): Genre | undefined => {
    return genres.find(genre => genre.id === id);
};