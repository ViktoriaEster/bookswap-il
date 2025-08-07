export type Book = {
    id: string;
    createdDate: string
    isNew: boolean;
    title: string;
    authorIds: string[];
    cityId: string;
    picture: string;
    languageId: string;
    ownerId: string;
    status: "active" | "archived";
    offerType: "exchange" | "sell" | "giveaway";
    price?: number;
    likesCount: number;
    viewsCount: number;
    favoritesCount: number;
    description?: string;
    condition: "new" | "good" | "worn";
    genreId: string;
};

export type BookCreateInput = Omit<Book, "id" | "likesCount" | "viewsCount" | "favoritesCount" | "status">;

export type MockBook = Omit<Book, "createdDate" | "isNew">;