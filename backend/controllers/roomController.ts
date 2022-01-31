import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Room from '../models/Room';

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