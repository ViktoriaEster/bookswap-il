export type City = {
    id: string;
    name: string;
};

export type CityAppUpdateInput = Omit <City, 'id'>;