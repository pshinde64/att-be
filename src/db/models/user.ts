import { Schema, model } from 'mongoose';

export interface User {
    name: string;
    email: string;
    role: 'superadmin' | 'admin' | 'user';
    password: string;
    institute?: Schema.Types.ObjectId;
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['superadmin', 'admin', 'user'], default: 'user' },
    institute: { type: Schema.Types.ObjectId, ref: 'Institute' },
});

const UserModel = model('User', userSchema);

export default UserModel;