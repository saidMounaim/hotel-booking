import express from 'express';
import { getAll, register, login, updateUser, getSingleUser, deleteUser, updateProfile, updatePassword } from '../controllers/userController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route("/").get(protect, admin, getAll);
router.route("/:id").put(protect, admin, updateUser).get(protect, admin, getSingleUser).delete(protect, admin, deleteUser);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(protect, updateProfile);
router.route("/update/password").put(protect, updatePassword);

export default router;