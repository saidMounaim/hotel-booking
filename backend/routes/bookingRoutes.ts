import express from 'express';
import { newBooking, checkRoomIsAvailble } from '../controllers/bookingController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route("/").post(protect, newBooking);
router.route("/check").post(checkRoomIsAvailble);

export default router;