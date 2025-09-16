import express from "express";
import { AuthMiddleWare, checkRole } from "../MiddleWare/authMeddleware.js";
import {
    generateQRCode,
    markAttendanceQR,
    markAttendanceManual,
    getStudentAttendance,
    getSectionAttendance
} from "../Controllers/attendanceController.js";

const attendanceRouter = express.Router();

// Teacher
attendanceRouter.post("/generate-qr", AuthMiddleWare, checkRole(["teacher"]), generateQRCode);
attendanceRouter.post("/manual", AuthMiddleWare, checkRole(["teacher"]), markAttendanceManual);
attendanceRouter.get("/section", AuthMiddleWare, checkRole(["teacher", "admin"]), getSectionAttendance);

// Student
attendanceRouter.post("/mark-qr", AuthMiddleWare, checkRole(["student"]), markAttendanceQR);
attendanceRouter.get("/student", AuthMiddleWare, checkRole(["student"]), getStudentAttendance);

export default attendanceRouter;
