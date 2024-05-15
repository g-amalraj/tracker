import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";
import AttendanceRoutes from './routes/AttendanceRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';


const port =process.env.PORT||3001;
connectDB();

const app = express();
const value='30mb';

const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions))
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/details',  AttendanceRoutes);
app.use('/projects',  projectRoutes);

app.use(bodyParser.json({ limit: value, extended: true }));
app.use(bodyParser.urlencoded({ limit: value, extended: true }));

app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`server running on port: ${port}`)
});