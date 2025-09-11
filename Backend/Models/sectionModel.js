import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    subjects: [{
        name: { type: String, required: true },
        teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    }],
    timetable: [{
        day: { type: String, required: true },  // e.g. "Monday"
        date: { type: String, required: true },  
        periods: [{
            subject: { type: String, required: true },
            teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            time: { type: String } // e.g. "10:00 - 11:00"
        }]
    }]
}, { timestamps: true });

//  Prevent OverwriteModelError
const SectionModel = mongoose.models.Section || mongoose.model("Section", SectionSchema);

export default SectionModel;
