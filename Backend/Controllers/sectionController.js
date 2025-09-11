
import SectionModel from "../Models/sectionModel.js";
import UserModel from "../Models/UserModel.js";

//  Create Section
export const createSection = async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Only admin can create sections" });

        const { name } = req.body;
        const exists = await SectionModel.findOne({ name });
        if (exists) return res.json({ success: false, message: "Section already exists" });

        const section = await SectionModel.create({ name });
        res.json({ success: true, message: "Section created"});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Assign Multiple Students
export const assignStudents = async (req, res) => {
    try {
        const { sectionId, studentIds } = req.body;
        if (req.user.role !== "admin") return res.status(403).json({ message: "Only admin can assign a student" });

        const section = await SectionModel.findById(sectionId);
        if (!section) return res.json({ success: false, message: "Section not found" });

        await UserModel.updateMany(
            { _id: { $in: studentIds }, role: "student" },
            { $set: { section: sectionId } }
        );

        res.json({ success: true, message: "Students assigned successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

//  Assign Multiple Teachers
export const assignTeachers = async (req, res) => {
    try {
        const { sectionId, teacherIds } = req.body;
        if (req.user.role !== "admin") return res.status(403).json({ message: "Only admin can assign Teacher" });

        const section = await SectionModel.findById(sectionId);
        if (!section) return res.json({ success: false, message: "Section not found" });

        await UserModel.updateMany(
            { _id: { $in: teacherIds }, role: "teacher" },
            { $addToSet: { sections: sectionId } }
        );

        res.json({ success: true, message: "Teachers assigned successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

//  Add Subjects
// Add Subjects with teacher
export const addSubjects = async (req, res) => {
    try {
        const { sectionId, subjects } = req.body;
        // subjects = [{ name: "Maths", teacher: "<teacherId>" }]

        if (req.user.role !== "admin")
            return res.status(403).json({ message: "Only admin can assign Subject" });

        const section = await SectionModel.findById(sectionId);
        if (!section)
            return res.json({ success: false, message: "Section not found" });

        // Optional: prevent duplicates
        subjects.forEach(sub => {
            const exists = section.subjects.find(s => s.name === sub.name);
            if (!exists) section.subjects.push(sub);
        });

        await section.save();

        res.json({ success: true, message: "Subjects added", section });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

//  Add Timetable
export const addTimetable = async (req, res) => {
    try {
        const { sectionId, timetable } = req.body;
        // timetable format: [{ day, date, periods: [{ subject, teacher, time }] }]
        if (req.user.role !== "admin") return res.status(403).json({ message: "Only admin can add TimeTable" });

        const section = await SectionModel.findById(sectionId);
        if (!section) return res.json({ success: false, message: "Section not found" });

        // append each new timetable entry
        timetable.forEach(t => {
            const exists = section.timetable.find(tt => tt.date === t.date);
            if (!exists) {
                section.timetable.push(t);
            }
        });

        await section.save();

        res.json({ success: true, message: "Timetable added successfully", section });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
