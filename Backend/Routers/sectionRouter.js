import express from "express";
import { AuthMiddleWare } from "../MiddleWare/authMeddleware.js";
import { createSection, assignStudents, assignTeachers, addSubjects, addTimetable } from "../Controllers/sectionController.js";

const sectionRouter = express.Router();

sectionRouter.post("/create", AuthMiddleWare, createSection);
sectionRouter.post("/assign-students", AuthMiddleWare, assignStudents);
sectionRouter.post("/assign-teachers", AuthMiddleWare, assignTeachers);
sectionRouter.post("/add-subjects", AuthMiddleWare, addSubjects);
sectionRouter.post("/add-timetable", AuthMiddleWare, addTimetable);

export default sectionRouter;
