import { Router } from "express";
import { UserController } from "../controller/user-controller";

export const userRouter = Router();

// Create new user
userRouter.post("/", UserController.create);

// Get all users
userRouter.get("/", UserController.getAll);

// Get user by ID
userRouter.get("/:id", UserController.get);

// Update user
userRouter.put("/:id", UserController.update);

// Delete user
userRouter.delete("/:id", UserController.delete);