import SectionModel from "../Models/sectionModel.js";
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


// Get teacher details + assigned sections + subjects + timetable
export const getTeacherDetails = async (req, res) => {
    try {
        const teacherId = req.user._id;

        // 1️⃣ Get teacher info
        const teacher = await UserModel.findById(teacherId).select("-password");
        if (!teacher) return res.status(404).json({ success: false, message: "Teacher not found" });

        // 2️⃣ Get sections where this teacher is assigned
        const sections = await SectionModel.find({
            "subjects.teacher": teacherId
        }).lean();

        // 3️⃣ Filter subjects and timetable for this teacher only
        const formattedSections = sections.map(section => {
            // subjects assigned to teacher
            const subjects = section.subjects.filter(s => s.teacher.toString() === teacherId.toString());

            // timetable periods assigned to teacher
            const timetable = section.timetable.map(t => {
                const periods = t.periods.filter(p => p.teacher.toString() === teacherId.toString());
                return { date: t.date, periods };
            }).filter(t => t.periods.length > 0); // remove dates with no periods

            return {
                _id: section._id,
                name: section.name,
                subjects,
                timetable
            };
        });

        res.json({ success: true, teacher, sections: formattedSections });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

