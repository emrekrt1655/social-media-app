import { PrismaClient } from "@prisma/client";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

const activeToken = process.env.ACTIVE_TOKEN_SECRET;
const accessToken = process.env.ACCESS_TOKEN_SECRET;
const refreshToken = process.env.REFRESH_TOKEN_SECRET;

export const genActiveToken = (payload: object) => {
    return jwt.sign(payload, `${activeToken}`, {expiresIn: "5m"})
}

export const genAccessToken = (payload: object) => {
    return jwt.sign(payload, `${accessToken}`, {expiresIn: "15m"})
}

export const genRefreshToken = (payload: object) => {
    return jwt.sign(payload, `${refreshToken}`, {expiresIn: "30d"})
}