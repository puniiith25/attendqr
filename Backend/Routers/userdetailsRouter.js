import express from "express";
import { AuthMiddleWare, checkRole } from "../MiddleWare/authMeddleware.js";
import { getAllStudents, getAllTeachers, getStudentDetails, getTeacherDetails } from "../Controllers/userdetailsController.js";

const detailRouter = express.Router();

detailRouter.get("/student", AuthMiddleWare, getStudentDetails);
detailRouter.get("/teacher", AuthMiddleWare, getTeacherDetails);
detailRouter.get("/teachers", AuthMiddleWare, checkRole(["admin"]), getAllTeachers);
detailRouter.get("/students", AuthMiddleWare, checkRole(["admin"]), getAllStudents);
detailRouter.get("/me", AuthMiddleWare, (req, res) => {
    res.json({ success: true, user: req.user });
});

export default detailRouter;
