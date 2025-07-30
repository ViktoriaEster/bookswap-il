export type Author = {
    id: string;
    name: string;
};

export type AuthorCreateUpdateInput = Omit<Author, 'id'>;
