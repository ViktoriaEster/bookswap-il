import type {Genre} from "../types/Genre.ts";
import {axiosInstance} from "./instance.ts";


export const getGenres = async ():Promise<Genre[]> => {
    try {
        const response = await axiosInstance.get<Genre[]>('/genres');
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw new Error('Error while getting genres');
    }
};

export const getGenreById = async (id: string):Promise<Genre> => {
    try {
        const response = await axiosInstance.get<Genre>(`/genres/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw new Error('Error getting genre');
    }
};