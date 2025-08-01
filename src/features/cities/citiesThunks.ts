import {createAsyncThunk} from "@reduxjs/toolkit";
import type {City, CityAppUpdateInput} from "../../types/City.ts";
import {addCity, deleteCity, getCities, getCityById, updateCity} from "../../api/citiesApi.ts";

export const getCitiesThunk = createAsyncThunk<City[], void, { rejectValue: string }>(
    "cities/getCities",
    async (_, thunkAPI) => {
        try {
            return await getCities();
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message || 'Failed to fetch cities');
        }
    }
);

export const getCityByIdThunk = createAsyncThunk<City, string, { rejectValue: string }>(
    "cities/getCityById",
    async (id: string, thunkAPI) => {
        try {
            return await getCityById(id);
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message || 'Failed to fetch city');
        }
    }
);

export const addCityThunk = createAsyncThunk<City, CityAppUpdateInput, { rejectValue: string }>(
    "cities/addCity",
    async (cityData: CityAppUpdateInput, thunkAPI) => {
        try {
            return await addCity(cityData);
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message || 'Failed to add city');
        }
    }
);

export const updateCityThunk = createAsyncThunk<City, { id: string, cityData: CityAppUpdateInput }, {
    rejectValue: string
}>(
    "cities/updateCity",
    async ({id, cityData}: { id: string, cityData: CityAppUpdateInput }, thunkAPI) => {
        try {
            return await updateCity(id, cityData);
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message || 'Failed to update city');
        }
    }
);

export const deleteCityThunk = createAsyncThunk<{ message: string, id: string }, string, { rejectValue: string }>(
    "cities/deleteCity",
    async (id: string, thunkAPI) => {
        try {
            return await deleteCity(id);
        } catch (error: any) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || 'Failed to delete city');
        }
    }
);