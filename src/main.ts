import express, { Express } from "express";
import { publicRouter } from "./routes/public-router";
import { errorMiddleware } from "./middleware/error-middleware";
import { PORT } from "./utils/env-util";

const app: Express = express();
const port = PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes - single public router
app.use("/api", publicRouter);

// Error handling middleware (must be last)
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});