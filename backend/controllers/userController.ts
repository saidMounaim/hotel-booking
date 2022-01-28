import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User, { IUserRequest } from "../models/User";
import generateToken from "../utils/generateToken";

// @Desc Register user
// @Route /api/users/register
// @Method POST
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, avatar } = req.body;

  const user = new User({
    name,
    email,
    password,
    avatar
  });

  await user.save();

  res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
  });
});


// @Desc Login user
// @Route /api/users/login
// @Method POST
export const login = asyncHandler(async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email })

  if(!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if(await user.comparePassword(password)) {

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });

  } else {
    res.status(401);
    throw new Error("Email or password incorrect");
  }

})

// @Desc Update profile
// @Route /api/users/update
// @Method PUT
export const updateProfile = asyncHandler(async (req: IUserRequest, res: Response) => {

  let user = await User.findById(req.user.id);

  if(!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const { name, email, avatar } = req.body;

  user = await User.findByIdAndUpdate(req.user.id, {
    name, email, avatar
  }, { new: true }).select("-password");

  res.status(201).json(user);

})