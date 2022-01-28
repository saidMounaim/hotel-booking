import express from 'express';
import { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { errorHandler, notFound } from './middlewares/errorMiddleware';

// Routes
import userRoutes from './routes/userRoutes';
import uploadRoutes from './routes/uploadRoutes';

const app: Application = express();

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());


// Default 
app.get("/api", (req: Request, res: Response)  => {
    res.status(201).json({ message: "Welcome to Hotel Booking App" });
})

// User Route
app.use("/api/users", userRoutes);

// Upload Route
app.use("/api/uploads", uploadRoutes);

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (): void => console.log(`Server is running on PORT ${PORT}`));
