import { Router } from "express";

import {
  getHighlightsController,
  getHighlightController,
  createHighlightController,
  updateHighlightController,
  deleteHighlightController,
} from "../controller/highlight.controller.js";
import { uploadHighlightFiles } from "../middleware/upload.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getHighlightsController);

router.get("/:id", getHighlightController);

router.post(
  "/",
  authMiddleware,
  uploadHighlightFiles.fields([
    { name: "media", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createHighlightController,
);

router.put(
  "/:id",
  authMiddleware,
  uploadHighlightFiles.fields([
    { name: "media", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateHighlightController,
);

router.delete("/:id", authMiddleware, deleteHighlightController);

export default router;
