import InstituteModel, { Institute } from "../../db/models/institute";
import UserModel from "../../db/models/user";

export const createInstitute = async (institute: Institute) => {
    try {
        const newInstitute = new InstituteModel(institute);
        return await newInstitute.save();
    } catch (error) {
        throw error;
    }
}

export const getInstitute = async (id: string) => {
    try {
        return await InstituteModel
            .findById(id)
            .exec();
    } catch (error) {
        throw error;
    }
}

export const patchInstitute = async (id: string, institute: Institute) => {
    try {
        return await InstituteModel
            .findByIdAndUpdate(id, institute)
            .exec();
    } catch (error) {
        throw error;
    }
}

export const deleteInstitute = async (id: string) => {
    try {
        return await InstituteModel
            .findByIdAndDelete(id)
            .exec();
    } catch (error) {
        throw error;
    }
}

export const getInstitutes = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    try {
        return await InstituteModel
            .find()
            .skip(skip)
            .limit(limit)
            .exec();
    } catch (error) {
        throw error;
    }
}

export const getInstituteUsers = async (id: string, page: number, limit: number) => {
    const skip = (page - 1) * limit;
    try {
        return await UserModel
            .find({ institute: id })
            .skip(skip)
            .limit(limit)
            .exec();
    } catch (error) {
        throw error;
    }
}