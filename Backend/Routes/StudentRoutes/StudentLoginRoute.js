import express from 'express'
import { StudentRegisterCon, StudentLoginCon, StudentLogOutCon } from '../../Controller/StudentController/StudentLoginCon.js';

const studentLoginRoute = express.Router();

studentLoginRoute.post('/register', StudentRegisterCon);
studentLoginRoute.post('/login', StudentLoginCon);
studentLoginRoute.post('/logout', StudentLogOutCon);
export default studentLoginRoute;