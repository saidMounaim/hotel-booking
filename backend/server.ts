import express from 'express';
import { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

const app: Application = express();

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;

// Default 
app.get("/api", (req: Request, res: Response)  => {
    res.status(201).json({ message: "Welcome to Hotel Booking App" });
})

app.listen(PORT, (): void => console.log(`Server is running on PORT ${PORT}`));
