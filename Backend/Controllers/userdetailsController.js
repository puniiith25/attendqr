import UserModel from "../Models/UserModel.js";

// ✅ Student Details
export const getStudentDetails = async (req, res) => {
    try {
        const student = await UserModel.findById(req.user.id)
            .populate({
                path: "section",
                populate: { path: "timetable.periods.teacher", select: "name email" }
            });

        if (!student || student.role !== "student")
            return res.status(403).json({ message: "Not a student account" });

        res.json({ success: true, student });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ✅ Teacher Details
export const getTeacherDetails = async (req, res) => {
    try {
        const teacher = await UserModel.findById(req.user.id).populate("sections");
        if (!teacher || teacher.role !== "teacher")
            return res.status(403).json({ message: "Not a teacher account" });

        const sectionsWithStudents = await Promise.all(
            teacher.sections.map(async (section) => {
                const students = await UserModel.find({ section: section._id, role: "student" }).select("name email");
                return { section, students };
            })
        );

        res.json({ success: true, teacher: { ...teacher._doc, sections: sectionsWithStudents } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
