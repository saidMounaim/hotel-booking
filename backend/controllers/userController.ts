import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";

// @Desc Register user
// @Route /api/users/register
// @Method POST
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password,
  });

  await user.save();

  res.status(201).json(user);
});
