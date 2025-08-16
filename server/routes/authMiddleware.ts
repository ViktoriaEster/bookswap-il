import { NextFunction, Response } from "express";
import { verifyAccessToken } from "../utils/jwtUtils";
import { AuthenticatedRequest } from "../types/express/AuthRequest";

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid Authorization header" });
    }

    const token = authHeader.slice("Bearer ".length).trim();

    try {
        const payload = verifyAccessToken(token);
        req.userId = payload.userId; // теперь TS знает про userId
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};