import type {Language} from "../types/Language.ts";
import {axiosInstance} from "./instance.ts";

export const getLanguages = async (): Promise<Language[]> => {
    try {
        const response = await axiosInstance.get<Language[]>('/languages');
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error('Unable to get languages');
    }
};

export const getLanguageById = async (id: string): Promise<Language> => {
    try {
        const response = await axiosInstance.get<Language>(`/languages/${id}`);
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error('Unable to get languages');
    }
};