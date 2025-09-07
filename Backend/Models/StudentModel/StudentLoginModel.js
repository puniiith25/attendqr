import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

const StudentLoginModel = mongoose.model("studentLogindata", LoginSchema);

export default StudentLoginModel;