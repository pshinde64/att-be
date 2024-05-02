import bcrypt from "bcrypt";
import UserModel from "../../db/models/user";
import jwt from "jsonwebtoken";

export const login = async (email: string, password: string) => {
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
        }, process.env.JWT_SECRET as string);
    } catch (error) {
        throw error;
    }
}