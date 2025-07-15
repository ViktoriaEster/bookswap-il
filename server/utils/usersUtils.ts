import {mockUsers as users} from "../data/mockUsers";
import {User} from "../types/User";


export const findUserAndIndexById = (userId: string): { user: User | null, index: number } => {
    const index = users.findIndex(user => user.userId === userId);
    if (index === -1) return {user: null, index: -1};
    return {user: users[index], index: index};
};

export const validateUser = (user: Partial<User>): string | null => {
    if (!user.name || typeof user.name !== "string" || user.name.trim() === "") {
        return "Name must be a non-empty string";
    }

    if (!user.email || typeof user.email !== "string" || !user.email.includes("@")) {
        return "Valid email is required";
    }

    return null;
}

export const validateUserUpdate = (user: Partial<User>): string | null => {
    if ("name" in user && (typeof user.name !== "string" || user.name.trim() === "")) {
        return "Name must be a non-empty string";
    }

    if ("email" in user && (typeof user.email !== "string" || !user.email.includes("@"))) {
        return "Valid email is required";
    }

    return null;
}