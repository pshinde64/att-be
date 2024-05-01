import UserModel, { User } from "../../db/models/user";

export const createUser = async (user: User) => {
    try {
        const newUser = new UserModel(user);
        return await newUser.save();
    } catch (error) {
        throw error;
    }
}

export const getUser = async (id: string) => {
    try {
        return await UserModel
            .findById(id)
            .populate("institute")
            .select("-password")
            .exec();
    } catch (error) {
        throw error;
    }
}

export const patchUser = async (id: string, user: User) => {
    try {
        return await UserModel
            .findByIdAndUpdate(id, user)
            .select("-password")
            .exec();
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (id: string) => {
    try {
        return await UserModel
            .findByIdAndDelete(id)
            .select("-password")
            .exec();
    } catch (error) {
        throw error;
    }
}

export const getUsers = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    try {
        return await UserModel
            .find()
            .populate("institute")
            .select("-password")
            .skip(skip)
            .limit(limit)
            .exec();
    } catch (error) {
        throw error;
    }
}