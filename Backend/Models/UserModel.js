import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "student", "teacher"],
        default: "student"
    },
    study_year: { type: String, default: "" },
    branch: { type: String, default: "" },
    department: { type: String, default: "" },
    StudentRollNO:{type:String,default:"",unique:true},
    Employeid: { type: String, default: "",unique:true},
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    },
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }]

}, { timestamps: true });

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
