import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import Database from './Database/Database.js';
import cookieParser from 'cookie-parser'
import studentLoginRoute from './Routes/StudentRoutes/StudentLoginRoute.js';

const app = express();
const port = 4000;
app.use(express.json());
app.use(cookieParser());


const AllowOrigin = 'http://localhost:5173'
app.use(cors({ origin: AllowOrigin, credentials: true }));

Database();
app.get('/', (req, res) => {
    res.send("running");
})

app.use('/student', studentLoginRoute);

app.listen(port, () => {
    console.log(`the Server Running on http://localhost:${port}`);
})