import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import 'dotenv/config'
import { Database } from './DataBase/DataBase.js';
import userRouter from './Routers/userRouter.js';

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
const PORT = process.env.PORT || 4000;


Database();


app.use('/user', userRouter)
app.listen(PORT, () => {
    console.log(`Server Running On http://localhost:${PORT}`);
})
