import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Booking, { IBooking } from '../models/Booking';
import { IUserRequest } from '../models/User';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment as any);

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

// @Desc Check room is available for booking
// @Route /api/bookings/check
// @Method POST
export const checkRoomIsAvailble = asyncHandler(async (req: Request, res: Response) => {

    const { roomId, checkInDate, checkOutDate } = req.body;

    const room = await Booking.find({ room: roomId, $and: [{
            checkInDate: {
                $lte: checkOutDate
            }
        }, {
            checkOutDate: {
                $gte: checkInDate
            }
        }]});

    let roomAvailable;

    if(room && room.length === 0) {
        roomAvailable = true;
    } else {
        roomAvailable = false;
    }

    res.status(201).json({ roomAvailable });

})

// @Desc Get all bookings current user
// @Route /api/bookings/me
// @Method GET
export const myBookings = asyncHandler(async (req: IUserRequest, res: Response) => {

    const bookings = await Booking.find({ user: req.user._id }).populate("user", "name email").populate("room", "name images");

    if(!bookings) {
        res.status(401);
        throw new Error("Bookings not found");
    }

    res.status(201).json(bookings);

})

// @Desc Get booked dates
// Route /api/bookings/dates/:roomId
// @Route GET
export const getBookedDates = asyncHandler(async (req: Request, res: Response) => {

    const bookings = await Booking.find({ room: req.params.roomId });

    let bookedDates: {}[] = [];

    const timeDiffernece = moment().utcOffset() / 60;

    bookings.forEach((booking: IBooking) => {

        const checkInDate = moment(booking.checkInDate).add(timeDiffernece, 'hours')
        const checkOutDate = moment(booking.checkOutDate).add(timeDiffernece, 'hours')

        const range = moment.range(moment(checkInDate), moment(checkOutDate));

        const dates = Array.from(range.by('day'));
        bookedDates = bookedDates.concat(dates);
    })

    res.status(200).json(bookedDates);

})

// @Desc Get all bookings
// @Route /api/bookings
// @Method GET
export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Booking.countDocuments();
    const bookings = await Booking.find({}).populate("room", "name").populate("user", "name email").limit(pageSize).skip(pageSize * (page - 1));
    res.status(201).json({
        bookings,
        page,
        pages: Math.ceil(count / pageSize),
        count
    });
})

// @Desc Delete booking 
// @Route /api/bookings/:id
// @Method DELETE
export const deleteBooking = asyncHandler(async (req: Request, res: Response) => {

    const booking = await Booking.findById(req.params.id);

    if(!booking) {
        res.status(401);
        throw new Error("Booking not found");
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(201).json({});

})