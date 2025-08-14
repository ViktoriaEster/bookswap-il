export type User = {
    userId: string;
    name: string;
    passwordHash?: string
    avatarUrl?: string
    birthDate?: string;
    sex?: 'male' | 'female';
    email: string;
    telegram?: string;
    aboutMe?: string;
    cityId?: string;
    favoriteBookIds?: string[];
    createdAt: string;
    updatedAt: string;
};

export type PublicUser = Omit<User, "passwordHash"|"email"|"telegram"|"createdAt"|"updatedAt">
export type PrivateUser = Omit<User, "passwordHash">;

export type UserInput = Omit<User, "userId"|"favoriteBookIds"|"createdAt"|"updatedAt">;