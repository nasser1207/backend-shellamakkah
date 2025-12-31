import express from "express";
import cors from "cors";
import morgan from "morgan";

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
app.use(errorHandler);

export default app;
