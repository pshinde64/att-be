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
            institute: user.institute
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
    switch (payload.role) {
        case "superadmin":
            if (allowedRoles.includes("superadmin")) {
                return true;
            }
            return false;
        case "admin":
            if (allowedRoles.includes("admin"))
            if(institueId && payload.institute === institueId)
            return true;
            return false;
        case "user":
            if (allowedRoles.includes("user") && payload.id === userId)
            if(userId && payload.id === userId)
            return true;
            return false;
        default:
            return false;
    }
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
                userId: req.params.userid || req.query.userid || req.body.userId,
                institueId: req.params.instituteid || req.query.instituteid || req.body.instituteId,
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