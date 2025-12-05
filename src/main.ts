import express, { Express } from "express";
import { userRouter } from "./routes/user-route";
import { restaurantRouter } from "./routes/restaurant-route";
import { orderRouter } from "./routes/order-route";
import { errorMiddleware } from "./middleware/error-middleware";
import { PORT } from "./utils/env-util";

const app: Express = express();
const port = PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRouter);
app.use("/api/restaurants", restaurantRouter);
app.use("/api/orders", orderRouter);

// Error handling middleware (must be last)
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});