import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Booking from '../models/Booking';
import { IUserRequest } from '../models/User';

// @Desc new booking
// @Route /api/bookings
// @Method POST
export const newBooking = asyncHandler(async (req: IUserRequest, res: Response) => {

    const { room, checkInDate, checkOutDate, amountPaid, daysOfStay, paymentInfo } = req.body;

    const booking = await Booking.create({
        room,
        user: req.user._id,
        checkInDate,
        checkOutDate,
        amountPaid,
        daysOfStay,
        paymentInfo,
        paidAt: Date.now(),
    });

    res.status(201).json(booking);

})