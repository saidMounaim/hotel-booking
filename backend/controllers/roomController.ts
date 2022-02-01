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