import type {City} from "../../types/City.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {addCityThunk, deleteCityThunk, getCitiesThunk, getCityByIdThunk, updateCityThunk} from "./citiesThunks.ts";

type CitiesState = {
    isLoading: boolean;
    error: string | null;
    items: City[];
};

const initialState: CitiesState = {
    isLoading: false,
    error: null,
    items: []
};

const CitiesSlice = createSlice({
    name: "cities",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //getCitiesThunk
            .addCase(getCitiesThunk.pending, (state: CitiesState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCitiesThunk.fulfilled, (state: CitiesState, action: PayloadAction<City[]>) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload;
            })
            .addCase(getCitiesThunk.rejected, (state: CitiesState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to load cities';
            })
            //getCityByIdThunk
            .addCase(getCityByIdThunk.pending, (state: CitiesState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCityByIdThunk.fulfilled, (state: CitiesState, action: PayloadAction<City>) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(city => city.id === action.payload.id);
                if (index == -1) state.items.push(action.payload);
                else state.items[index] = action.payload;
            })
            .addCase(getCityByIdThunk.rejected, (state: CitiesState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch city';
            })
            //addCityThunk
            .addCase(addCityThunk.pending, (state: CitiesState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addCityThunk.fulfilled, (state: CitiesState, action: PayloadAction<City>) => {
                state.isLoading = false;
                state.error = null;
                state.items.push(action.payload);
            })
            .addCase(addCityThunk.rejected, (state: CitiesState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to add city';
            })
            //updateCityThunk
            .addCase(updateCityThunk.pending, (state: CitiesState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateCityThunk.fulfilled, (state: CitiesState, action: PayloadAction<City>) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(city => city.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(updateCityThunk.rejected, (state: CitiesState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to update city';
            })
            //deleteCityThunk
            .addCase(deleteCityThunk.pending, (state: CitiesState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteCityThunk.fulfilled, (state: CitiesState, action: PayloadAction<{
                message: string,
                id: string
            }>) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(city => city.id === action.payload.id);
                if (index !== -1) state.items.splice(index, 1);
            })
            .addCase(deleteCityThunk.rejected, (state: CitiesState, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete city';
            })
    }
});

export default CitiesSlice.reducer;