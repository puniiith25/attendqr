import express from 'express'
import { Login, logout, userRegister } from '../Controllers/userController.js';
import { AuthMiddleWare } from '../MiddleWare/authMeddleware.js';

const userRouter = express.Router();

userRouter.post('/register', AuthMiddleWare, userRegister);
userRouter.post("/login", Login);
userRouter.post("/logout", logout);

export default userRouter;