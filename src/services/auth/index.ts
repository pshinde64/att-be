import bcrypt from "bcrypt";
import UserModel from "../../db/models/user";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

export const login = async ({ email, password }: { email: string, password: string }) => {
    try {
        const user = await UserModel
            .findOne({ email })
            .exec();
        if (!user) {
            throw new Error("User not found");
        }
        // use bcrypt to compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid password");
        }
        // create jwt token using jsonwebtoken
        const token = jwt.sign({ 
            id: user._id,
            email: user.email,
            role: user.role,
            institue: user.institute
        }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
        return token;
    } catch (error) {
        throw error;
    }
}

export const verifyToken = async (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
        throw error;
    }
}

const checkAuthorization = async ({ 
    allowedRoles,
    userId,
    institueId,
    payload,
}: { 
    allowedRoles: string[], 
    userId: string,
    institueId: string,
    payload: any
}) => {
    console.log({
        allowedRoles,
        userId,
        institueId,
        payload,
    });
    return true;
};

export const checkAuthorizationMiddleware = ({ allowedRoles }: { allowedRoles: string[] }): RequestHandler => {
    return async (req, res, next) => {
        try {
            const payload = req.body.payload
            if (!payload) {
                throw new Error("Unauthorized");
            }
            const isAuthorized = await checkAuthorization({
                allowedRoles,
                userId: payload.id,
                institueId: payload.institute,
                payload,
            });
            if (!isAuthorized) {
                throw new Error("Unauthorized");
            }
            next();
        } catch (error: any) {
            res.status(401).send(error.message);
        }
    }
}