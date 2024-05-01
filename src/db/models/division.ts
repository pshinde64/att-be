import { Schema, model } from 'mongoose';

export interface Division {
    name: string;
    institute: Schema.Types.ObjectId
}

const divisionSchema = new Schema<Division>({
    name: { type: String, required: true },
    institute: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
});

const DivisionModel = model('Division', divisionSchema);

export default DivisionModel;