import express from "express";
import { AuthMiddleWare } from "../ModdleWare/authMeddleware.js";
import { getStudentDetails, getTeacherDetails } from "../Controllers/userdetailsController.js";

const detailRouter = express.Router();

detailRouter.get("/student", AuthMiddleWare, getStudentDetails);
detailRouter.get("/teacher", AuthMiddleWare, getTeacherDetails);

export default detailRouter;
