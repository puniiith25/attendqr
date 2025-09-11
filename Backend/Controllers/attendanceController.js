import AttendanceModel from "../Models/AttendanceModel.js";
import QRCode from "qrcode";
import SectionModel from '../Models/sectionModel.js'

export const generateQRCode = async (req, res) => {
    try {
        const { sectionId, subject, day } = req.body; // now we pass day (e.g. "Monday")

        // 1️⃣ Check if section exists
        const section = await SectionModel.findById(sectionId);
        if (!section) {
            return res.status(404).json({ success: false, message: "Section not found" });
        }

        // 2️⃣ Check if subject exists in section's subjects
        if (!section.subjects.includes(subject)) {
            return res.status(400).json({ success: false, message: "Subject not found in this section" });
        }

        // 3️⃣ Check if subject is scheduled in timetable for that day
        const timetableDay = section.timetable.find(t => t.day === day);
        if (!timetableDay) {
            return res.status(400).json({ success: false, message: "No timetable found for this day" });
        }

        const subjectExists = timetableDay.periods.find(p => p.subject === subject);
        if (!subjectExists) {
            return res.status(400).json({ success: false, message: "This subject is not scheduled today" });
        }

        // 4️⃣ Generate QR
        const qrData = { sectionId, subject, day };
        const qrString = JSON.stringify(qrData);

        const qrImage = await QRCode.toDataURL(qrString);

        res.json({ success: true, qrImage, qrData });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



// ✅ Student scans QR code → Mark attendance
export const markAttendanceQR = async (req, res) => {
    try {
        const { qrData } = req.body; // { sectionId, subject, date }
        const studentId = req.user._id;

        // 1️⃣ Validate timetable
        const timetable = await TimetableModel.findOne({ section: qrData.sectionId, day: qrData.date });
        if (!timetable) {
            return res.status(400).json({ success: false, message: "No timetable found" });
        }

        const subjectExists = timetable.subjects.find(sub => sub.name === qrData.subject);
        if (!subjectExists) {
            return res.status(400).json({ success: false, message: "Invalid subject for this timetable" });
        }

        // 2️⃣ Check if student belongs to this section
        const student = await UserModel.findById(studentId);
        if (!student || student.role !== "student") {
            return res.status(403).json({ success: false, message: "Invalid student" });
        }

        if (!student.section || student.section.toString() !== qrData.sectionId) {
            return res.status(403).json({ success: false, message: "You are not assigned to this section" });
        }

        // 3️⃣ Create or update attendance record
        let record = await AttendanceModel.findOne({
            section: qrData.sectionId,
            subject: qrData.subject,
            date: qrData.date
        });

        if (!record) {
            record = await AttendanceModel.create({
                section: qrData.sectionId,
                subject: qrData.subject,
                date: qrData.date,
                students: []
            });
        }

        // 4️⃣ Check if already marked
        const already = record.students.find(s => s.student.toString() === studentId.toString());
        if (already) {
            return res.json({ success: false, message: "Attendance already marked" });
        }

        // 5️⃣ Mark student present
        record.students.push({ student: studentId, status: "present", markedBy: "qr" });
        await record.save();

        res.json({ success: true, message: "Attendance marked successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


// ✅ Teacher manually marks attendance
export const markAttendanceManual = async (req, res) => {
    try {
        const { sectionId, subject, date, attendanceList } = req.body;
        // attendanceList = [{ studentId, status }]

        let record = await AttendanceModel.findOne({ section: sectionId, subject, date });
        if (!record) {
            record = await AttendanceModel.create({ section: sectionId, subject, date, students: [] });
        }

        attendanceList.forEach(item => {
            const index = record.students.findIndex(s => s.student.toString() === item.studentId);
            if (index > -1) {
                record.students[index].status = item.status;
                record.students[index].markedBy = "manual";
            } else {
                record.students.push({ student: item.studentId, status: item.status, markedBy: "manual" });
            }
        });

        await record.save();
        res.json({ success: true, message: "Manual attendance updated" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ✅ Student sees their attendance
export const getStudentAttendance = async (req, res) => {
    try {
        const studentId = req.user._id;
        const attendance = await AttendanceModel.find({ "students.student": studentId })
            .populate("section", "name");

        res.json({ success: true, attendance });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ✅ Teacher views section attendance
export const getSectionAttendance = async (req, res) => {
    try {
        const { sectionId, subject, date } = req.query;
        const records = await AttendanceModel.find({ section: sectionId, subject, date })
            .populate("students.student", "name email");

        res.json({ success: true, records });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
