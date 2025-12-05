import { Router } from "express";
import { RestaurantController } from "../controller/restaurant-controller";

export const restaurantRouter = Router();

// Create new restaurant
restaurantRouter.post("/", RestaurantController.create);

// Get all restaurants or filter by status
restaurantRouter.get("/", RestaurantController.getAll);

// Get restaurants by open/closed status (query param: ?open=true or ?open=false)
restaurantRouter.get("/status", RestaurantController.getByStatus);

// Get restaurant by ID
restaurantRouter.get("/:id", RestaurantController.get);

// Update restaurant
restaurantRouter.put("/:id", RestaurantController.update);

// Delete restaurant
restaurantRouter.delete("/:id", RestaurantController.delete);