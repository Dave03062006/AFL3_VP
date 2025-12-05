import { Router } from "express";
import { UserController } from "../controller/user-controller";
import { RestaurantController } from "../controller/restaurant-controller";
import { OrderController } from "../controller/order-controller";

export const publicRouter = Router();

publicRouter.post("/users", UserController.create);
publicRouter.get("/users", UserController.getAll);
publicRouter.get("/users/:id", UserController.get);
publicRouter.put("/users/:id", UserController.update);
publicRouter.delete("/users/:id", UserController.delete);

publicRouter.post("/restaurants", RestaurantController.create);
publicRouter.get("/restaurants", RestaurantController.getAll);
publicRouter.get("/restaurants/status", RestaurantController.getByStatus);
publicRouter.get("/restaurants/:id", RestaurantController.get);
publicRouter.put("/restaurants/:id", RestaurantController.update);
publicRouter.delete("/restaurants/:id", RestaurantController.delete);

publicRouter.post("/orders", OrderController.create);
publicRouter.get("/orders", OrderController.getAll);
publicRouter.get("/orders/user/:userId", OrderController.getByUser);
publicRouter.get("/orders/restaurant/:restaurantId", OrderController.getByRestaurant);
publicRouter.get("/orders/:id", OrderController.get);
publicRouter.put("/orders/:id", OrderController.update);
publicRouter.delete("/orders/:id", OrderController.delete);