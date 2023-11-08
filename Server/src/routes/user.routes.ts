import { Router } from "express";
import { createUser, getAllUsers, getAllUsersRegistered, updateUser, deleteUser, getUserById } from "../controllers/user.controllers";
import { check } from "../middleware/check.middleware";

const userRoutes = Router();

userRoutes.get('/', getAllUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.patch('/:userId', updateUser);

userRoutes.post('/', check, createUser);
userRoutes.delete('/:userId', deleteUser);

userRoutes.get('/registered', getAllUsersRegistered);

export default userRoutes;