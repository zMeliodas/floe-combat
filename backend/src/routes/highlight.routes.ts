import { Router } from "express";

import {
  getHighlightsController,
  getHighlightController,
  createHighlightController,
  updateHighlightController,
  deleteHighlightController,
} from "../controller/highlight.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getHighlightsController);

router.get("/:id", getHighlightController);

router.post("/", authMiddleware, createHighlightController);

router.put("/:id", authMiddleware, updateHighlightController);

router.delete("/:id", authMiddleware, deleteHighlightController);

export default router;
