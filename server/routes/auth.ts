import { Router, Response, Request } from "express";
import { PrivateUser } from "../types/User";
import { findUserAndIndexByEmail, findUserAndIndexById, mapToPrivateUser } from "../utils/usersUtils";
import { signAccessToken } from "../utils/jwtUtils";
import { authMiddleware } from "./authMiddleware";
import { AuthenticatedRequest } from "../types/express/AuthRequest";

const router = Router();

// login
router.post(
    "/login",
    (req: Request<{}, {}, { email: string; password: string }>, res: Response<{ token: string } | { error: string }>) => {
        const { email, password } = req.body;
        const { user, index } = findUserAndIndexByEmail(email);
        if (index === -1 || user.passwordHash !== password) {
            return res.status(401).json({ error: "E-mail or password not correct" });
        }
        const token = signAccessToken({ userId: user.userId });
        return res.status(200).json({ token:token });
    }
);

// get private user by id
router.get("/me", authMiddleware, (req: AuthenticatedRequest, res: Response<PrivateUser | { error: string }>) => {
    const id = req.userId;
    if (!id) return res.status(401).json({ error: "Unauthorized user" });

    const { user, index } = findUserAndIndexById(id);
    if (index === -1) return res.status(404).json({ error: "User not found" });

    const privateUser = mapToPrivateUser(user);
    res.status(200).json(privateUser);
});

export default router;