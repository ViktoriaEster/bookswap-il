import * as jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"];

export type JwtPayload = { userId: string };

export const signAccessToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export const verifyAccessToken = (token: string): JwtPayload => {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") {
        throw new Error("Invalid token payload");
    }
    return decoded as JwtPayload;
}