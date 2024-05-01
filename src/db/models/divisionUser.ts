import { Schema, model } from 'mongoose';

interface DivisionUser {
    division: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
}

const divisionUserSchema = new Schema<DivisionUser>({
    division: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const DivisionUserModel = model('DivisionUser', divisionUserSchema);

export default DivisionUserModel;