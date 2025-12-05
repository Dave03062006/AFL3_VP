import { Router } from "express";
import { OrderController } from "../controller/order-controller";

export const orderRouter = Router();

// Create new order
orderRouter.post("/", OrderController.create);

// Get all orders
orderRouter.get("/", OrderController.getAll);

// Get orders by user ID
orderRouter.get("/user/:userId", OrderController.getByUser);

// Get orders by restaurant ID
orderRouter.get("/restaurant/:restaurantId", OrderController.getByRestaurant);

// Get order by ID
orderRouter.get("/:id", OrderController.get);

// Update order
orderRouter.put("/:id", OrderController.update);

// Delete order
orderRouter.delete("/:id", OrderController.delete);