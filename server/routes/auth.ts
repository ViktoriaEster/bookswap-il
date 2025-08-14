import "express";
import {PrivateUser} from "../types/User";
import {findUserAndIndexByEmail, findUserAndIndexById, mapToPrivateUser} from "../utils/usersUtils";
import { Router, Request, Response } from "express";
import {signAccessToken, verifyAccessToken} from "../utils/jwtUtils";
import { NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    userId?: string;
}

const router = Router();

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid Authorization header" });
    }
    const token = authHeader.slice("Bearer ".length).trim();
    try {
        const payload = verifyAccessToken(token);
        req.userId = payload.userId;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

//login
router.post("/login", (req: Request<{}, {}, {email: string, password: string}>, res: Response<{user: PrivateUser, token: string} | {error: string}>) => {
    const {email, password} = req.body;
    const {user, index} = findUserAndIndexByEmail(email);
    if (index === -1 || user.passwordHash !== password) return res.status(401).json({error: "E-mail or password not correct"});
    const token = signAccessToken({userId: user.userId});
    const privateUser = mapToPrivateUser(user);
    return res.status(200).json({user: privateUser, token: token});
});

//get private user by id
router.get("/me", authMiddleware, (req: AuthenticatedRequest, res: Response<PrivateUser | {error: string}>) => {
    const id = req.userId;
    if (!id) return res.status(401).json({ error: "Unauthorized user" });
    const {user, index} = findUserAndIndexById(id);
    if (index ===-1) {return res.status(404).json({error: "User not found"})}
    const privateUser = mapToPrivateUser(user);
    res.status(200).json(privateUser);
});


export default router;