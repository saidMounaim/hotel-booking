import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Room from '../models/Room';
import { IUserRequest } from '../models/User';

// @Desc Get All Rooms
// @Route /api/rooms
// @Method GET
export const getAll = asyncHandler(async(req: Request, res: Response) => {
    const rooms = await Room.find({});
    res.status(201).json(rooms);
})

// @Desc Get Single Room
// @Route /api/rooms/:id
// @Method GET
export const getSingle = asyncHandler(async (req: Request, res: Response) => {

    const room = await Room.findById(req.params.id);

    if(!room) {
        res.status(401);
        throw new Error("Room not found");
    }

    res.status(201).json(room);

})

// @Desc Create new room
// @Route /api/rooms
// @Method POST
export const addRoom = asyncHandler(async (req: IUserRequest, res: Response) => {

    req.body.user = req.user._id;

    const room = await Room.create(req.body);

    res.status(201).json(room);

})

// @Desc Update room
// @Route /api/rooms/:id
// @Method PUT
export const updateRoom = asyncHandler(async (req: IUserRequest, res: Response) => {

    let room = await Room.findById(req.params.id);

    if(!room) {
        res.status(401);
        throw new Error("Room not found");
    }

    room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(201).json(room);

})

// @Desc Delete room
// @Route /api/rooms/:id
// @Method DELETE
export const deleteRoom = asyncHandler(async (req: IUserRequest, res: Response) => {

    let room = await Room.findById(req.params.id);

    if(!room) {
        res.status(401);
        throw new Error("Room not found");
    }

    room = await Room.findByIdAndDelete(req.params.id);

    res.status(201).json({});

})

// @Desc Create Room Review
// @Route /api/rooms/:id/reviews
// @Method POST
export const createRoomReview = asyncHandler(async (req: IUserRequest, res: Response) => {

    const room = await Room.findById(req.params.id);

    if(room) {

        const alreadyReviewd = room.reviews?.find(review => review.user.toString() === req.user._id.toString());

        if(alreadyReviewd) {
            res.status(401);
            throw new Error("Already reviewed");
        }

        const { rating, comment } = req.body;

        const review = {
            user: req.user._id,
            rating: Number(rating),
            comment,
        }

        room.reviews?.push(review);

        room.numOfReviews = room.reviews?.length;

        room.ratings = room.reviews?.reduce((acc: any, item: any) => item?.rating + acc, 0) / Number(room.reviews?.length);

        await room.save();

        res.status(201).json({ message: "Review added" });

    } else {
        res.status(401);
        throw new Error("Room not found");
    }

})