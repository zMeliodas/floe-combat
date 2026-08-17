import cors from "cors";
import express from "express";
import productRoutes from "./routes/product.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import pool from "./db/pool.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use("/api/uploads", uploadRoutes);
app.use("/api/products", productRoutes);

app.get("/api/health/database", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS database_time");

    res.status(200).json({
      status: "ok",
      databaseTime: result.rows[0].database_time,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Could not connect to PostgreSQL.",
    });
  }
});

export default app;
