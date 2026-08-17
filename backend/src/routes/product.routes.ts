import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json([]);
});

router.post("/", (req, res) => {
  res.status(201).json({
    message: "Product created",
    product: req.body
  });
});

export default router;