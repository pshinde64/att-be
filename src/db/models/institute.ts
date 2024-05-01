import { Schema, model } from 'mongoose';

export interface Institute {
    name: string;
    address: string;
}

const instituteSchema = new Schema<Institute>({
    name: { type: String, required: true },
    address: { type: String, required: true },
});

const InstituteModel = model('Institute', instituteSchema);

export default InstituteModel;