import { type Request, type Response, Router } from "express";
import { mockUsers as users } from "../data/mockUsers";
import {mockBooks as books} from "../data/mockBooks";
import { PublicUser, User, UserInput } from "../types/User";
import { findUserAndIndexById, mapUserToPublic, validateUser, validateUserUpdate } from "../utils/usersUtils";
import { authMiddleware } from "./authMiddleware";
import { AuthenticatedRequest } from "../types/express/AuthRequest";
import {findBookAndIndexById} from "../utils/booksUtils";

const router = Router();

//Get methods
// get all public users
router.get("/", (req: Request, res: Response<PublicUser[]>) => {
    const resUsers = users.map((user: User) => mapUserToPublic(user));
    res.status(200).json(resUsers);
});

//get public user by id
router.get("/:id", (req: Request<{ id: string }>, res: Response<PublicUser | { error: string }>) => {
    const id = req.params.id;
    const { user, index } = findUserAndIndexById(id);
    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    const resUser = mapUserToPublic(user);
    res.status(200).json(resUser);
});

//get telegram link by userId
router.get("/telegram/:id", (req: Request<{ id: string }>, res: Response<{ link: string } | { error: string }>) => {
    const id = req.params.id;
    const { user, index } = findUserAndIndexById(id);
    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    const link = user.telegram;
    if (!link) {
        return res.status(404).json({ error: "Telegram not available" });
    }
    res.status(200).json({ link });
});

//add user
router.post("/", (req: Request<{}, {}, UserInput>, res: Response<User | { error: string }>) => {
    const userData = req.body;
    const newUser: User = {
        userId: "",
        name: userData.name,
        birthDate: userData.birthDate,
        sex: userData.sex,
        email: userData.email,
        telegram: userData.telegram,
        avatarUrl: userData.avatarUrl,
        cityId: userData.cityId,
        aboutMe: userData.aboutMe,
        favoriteBookIds: [],
        createdAt: Date.now().toString(),
        updatedAt: "",
        passwordHash: ""
    };

    const validationError = validateUser(newUser);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    const generateId = (length: number = 8): string => {
        return "u" + Math.random().toString(36).substring(2, 2 + length);
    };

    newUser.userId = generateId();
    users.push(newUser);
    res.status(201).json(newUser);
});

//edit user (only self)
router.put("/:id", authMiddleware, (req: AuthenticatedRequest, res: Response<User | { error: string }>) => {
    const id = req.params.id;

    if (req.userId !== id) {
        return res.status(403).json({ error: "You can edit only your own profile" });
    }

    const { user, index } = findUserAndIndexById(id);
    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    const userUpdateData = req.body;
    const updateUser = { ...user, ...userUpdateData, updatedAt: Date.now().toString() };
    users[index] = updateUser;

    const validationError = validateUserUpdate(req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    users[index] = updateUser;
    res.status(200).json(updateUser);
});

//add-remove favorite book (only self
router.patch("/favorite/:bookId", authMiddleware, (req: AuthenticatedRequest, res: Response<{status: string, bookId: string} | { error: string }>) => {
    const userId = req.userId;
    const bookId: string = req.params.bookId;
    const action: 'add'| 'remove' = req.body.action;

    const { index: userIndex } = findUserAndIndexById(userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    const {index: bookIndex} = findBookAndIndexById(bookId);
    if (bookIndex === -1) {
        return res.status(404).json({ error: "Book not found" });
    }

    if (action==='remove') {
        users[userIndex].favoriteBookIds = users[userIndex].favoriteBookIds.filter(id => id !== bookId);
        books[bookIndex].likesCount += 1;
        return res.status(200).json({status: 'removed successful from favorite', bookId});
    }
    if (action==='add') {
        users[userIndex].favoriteBookIds.push(bookId);
        books[bookIndex].likesCount -= 1;
        return res.status(200).json({status: 'added successful to favorite', bookId});
    }

});

//delete user (only self)
router.delete("/:id", authMiddleware, (req: AuthenticatedRequest, res: Response<string | { error: string }>) => {
    const id = req.params.id;

    if (req.userId !== id) {
        return res.status(403).json({ error: "You can delete only your own profile" });
    }

    const { index } = findUserAndIndexById(id);
    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    users.splice(index, 1);
    res.status(200).json(`User with id ${id} deleted`);
});

export default router;