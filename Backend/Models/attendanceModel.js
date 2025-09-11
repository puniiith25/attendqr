import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    section: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
    subject: { type: String, required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    students: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: String, enum: ["present", "absent"], default: "present" },
        markedBy: { type: String, enum: ["qr", "manual"], default: "qr" }
    }]
}, { timestamps: true });

const AttendanceModel = mongoose.model("Attendance", AttendanceSchema);
export default AttendanceModel;
