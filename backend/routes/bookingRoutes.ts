import express from 'express';
import { getAll, newBooking, checkRoomIsAvailble, getBookedDates, myBookings, deleteBooking } from '../controllers/bookingController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route("/").post(protect, newBooking).get(protect, admin, getAll);
router.route("/me").get(protect, myBookings);
router.route("/check").post(checkRoomIsAvailble);
router.route("/dates/:roomId").get(getBookedDates);
router.route("/:id").delete(protect, admin, deleteBooking);

export default router;