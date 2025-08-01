import type {City, CityAppUpdateInput} from "../types/City.ts";
import {axiosInstance} from "./instance.ts";


export const getCities = async (): Promise<City[]> => {
    try {
        const response = await axiosInstance.get<City[]>('/cities');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting cities");
    }
};

export const getCityById = async (id: string): Promise<City> => {
    try {
        const response = await axiosInstance.get<City>(`/cities/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting city");
    }
};

export const addCity = async (cityData: CityAppUpdateInput): Promise<City> => {
    try {
        const response = await axiosInstance.post<City>('/cities', cityData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error adding city");
    }
};

export const updateCity = async (id: string, cityData: CityAppUpdateInput): Promise<City> => {
    try {
        const response = await axiosInstance.put<City>(`/cities/${id}`, cityData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error updating city");
    }
};

export const deleteCity = async (id: string): Promise<{ message: string, id: string}> => {
    try {
        const response = await axiosInstance.delete<{ message: string }>(`/cities/${id}`);
        return {message: response.data.message, id: id};
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting city");
    }
};