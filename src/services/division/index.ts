import AttendanceModel from "../../db/models/attendance";
import DivisionModel, { Division } from "../../db/models/division";
import DivisionUserModel from "../../db/models/divisionUser";

export const createDivision = async (division: Division) => {
    try {
        const newDivision = new DivisionModel(division);
        return await newDivision.save();
    } catch (error) {
        throw error;
    }
}

export const getDivision = async (id: string, institueId: string) => {
    try {
        return await DivisionModel
            .findOne({
                _id: id,
                institute: institueId
            })
            .exec();
    } catch (error) {
        throw error;
    }
}

export const patchDivision = async (id: string, division: Division) => {
    try {
        return await DivisionModel
            .findByIdAndUpdate(id, division)
            .exec();
    } catch (error) {
        throw error;
    }
}

export const deleteDivision = async (id: string) => {
    try {
        return await DivisionModel
            .findByIdAndDelete(id)
            .exec();
    } catch (error) {
        throw error;
    }
}

export const getDivisions = async (page: number, limit: number, institueId: string) => {
    const skip = (page - 1) * limit;
    try {
        return await DivisionModel
            .find({
                institute: institueId
            })
            .skip(skip)
            .limit(limit)
            .exec();
    } catch (error) {
        throw error;
    }
}

export const addUsersToDivision = async (id: string, users: string[]) => {
    try {
        return await DivisionUserModel
            .bulkWrite(users.map((user) => ({
                insertOne: {
                    document: {
                        division: id,
                        user
                    }
                }
            })));
    } catch (error) {
        throw error;
    }
}

export const getDivisionUsers = async (id: string, page: number, limit: number) => {
    try {
        return await DivisionUserModel
            .find({ 
                division: id,
            })
            .populate("user", "-password")
            .exec();
    } catch (error) {
        throw error;
    }
};

export const addAttendance = async (id: string, userId: string, date: string, status: string) => {
    try {
        const divisionUser = await DivisionUserModel
            .findOneAndUpdate(
                { division: id, user: userId },
                { upsert: true }
            )
            .select("_id");

        if (!divisionUser) {
            throw new Error("User not found in division");
        }

        return await AttendanceModel
            .create({
                divisionUser: divisionUser._id,
                date,
                status
            });
    } catch (error) {
        throw error;
    }
}

export const getAttendance = async (id: string, userId: string) => {
    try {
        const divisionUser = await DivisionUserModel
        .findOne(
            { division: id, user: userId },
        )
        .select("_id");

        if (!divisionUser) {
            throw new Error("User not found in division");
        }

        return await AttendanceModel.
            find(
                { 
                    _id: divisionUser._id,
                }
            )
    } catch (error) {
        
    }
}