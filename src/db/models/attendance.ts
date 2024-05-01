import { Schema, model } from 'mongoose';

export interface Attendance {
    divisionUser: Schema.Types.ObjectId;
    date: Date;
    status: 'present' | 'absent';
}

const attendanceSchema = new Schema<Attendance>({
    divisionUser: { type: Schema.Types.ObjectId, ref: 'DivisionUser', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['present', 'absent'], required: true },
});

const AttendanceModel = model('Attendance', attendanceSchema);

export default AttendanceModel;