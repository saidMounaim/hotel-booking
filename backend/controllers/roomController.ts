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