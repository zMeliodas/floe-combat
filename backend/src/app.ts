import cors from "cors";
import express from "express";
import productRoutes from "./routes/product.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import pool from "./db/pool.js";
import adminActivityRoutes from "./routes/admin.routes.js";
import highlightRoutes from "./routes/highlight.routes.js";
import { uploadErrorHandler } from "./middleware/upload.error.middleware.js";
import reviewRoutes from "./routes/review.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/admin/activities", adminActivityRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/highlights", highlightRoutes);
app.use("/api/reviews", reviewRoutes);
app.use(uploadErrorHandler);

export default app;