import express from 'express';
import { newBooking } from '../controllers/bookingController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route("/").post(protect, newBooking);

export default router;