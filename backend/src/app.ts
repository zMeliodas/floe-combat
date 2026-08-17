import cors from "cors";
import express from "express";
import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;