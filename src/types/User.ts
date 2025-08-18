export type User = {
    userId: string;
    name: string;
    avatarUrl?: string
    birthDate?: string;
    sex?: 'male' | 'female';
    telegram?: string;
    aboutMe?: string;
    cityId?: string;
    favoriteBookIds?: string[];
};

export type PrivateUser = User & {
    email: string;
    createdAt: string;
    updatedAt: string;
    passwordHash: string;
}

export type AuthLoginData = {
    email: string;
    password: string;
}

export type UserInput = Omit<User, "userId"|"favoriteBookIds">;