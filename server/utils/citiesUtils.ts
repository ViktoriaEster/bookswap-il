import {City} from "../types/City";
import {mockCities as cities} from "../data/mockCities";

export const findCityAndIndexById = (id: string): { city: City | null; index: number } => {
    const index = cities.findIndex(c => c.id === id);
    if (index === -1) return {city: null, index: -1};
    return {city: cities[index], index};
};

export const validateCityName = (newCityName: string): string | null => {
    const trimmedName = newCityName.trim();
    if (!trimmedName) return "City name cannot be empty";
    if (trimmedName.length < 2) return "City name must be at least 2 characters long";
    const nameExists = cities.some(
        c => c.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );
    if (nameExists) return "City name already exists";
    return null;
};

export const generateCountCityId = (): string => {
    const existingIds = cities.map(city => parseInt(city.id.replace("c", ""), 10));
    const maxId = existingIds.length ? Math.max(...existingIds) : 0;
    return "c" + (maxId + 1);
};