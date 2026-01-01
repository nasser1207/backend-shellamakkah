import express from "express";
import cors from "cors";
import morgan from "morgan";
import protectedRoutes from "./routes/protected.routes.js";
import authRoutes from "./routes/auth.routes.js";

import healthRoutes from "./routes/health.routes.js";
import dbTestRoutes from "./routes/db-test.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { swaggerSetup } from "./docs/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

swaggerSetup(app);

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/db", dbTestRoutes);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/protected", protectedRoutes);
app.use(errorHandler);

export default app;
