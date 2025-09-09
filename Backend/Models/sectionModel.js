import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    subjects: [{ type: String }],

    timetable: [{
        day: { type: String, required: true },  // e.g. "Monday"
        periods: [{
            subject: { type: String, required: true },
            teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            time: { type: String } // e.g. "10:00 - 11:00"
        }]
    }]
}, { timestamps: true });

const SectionModel = mongoose.model("Section", SectionSchema);
export default SectionModel;
