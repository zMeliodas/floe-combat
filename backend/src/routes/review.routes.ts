import { Router } from "express";

import {
  createCustomerReviewController,
  createAdminReviewController,
  getApprovedReviewsController,
  getAllReviewsController,
  getReviewByIdController,
  updateReviewStatusController,
  updateReviewFeaturedController,
  updateReviewController,
  deleteReviewController,
} from "../controller/review.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", createCustomerReviewController);

router.get("/approved", getApprovedReviewsController);

router.get("/admin", authMiddleware, getAllReviewsController);

router.get("/admin/:id", authMiddleware, getReviewByIdController);

router.post("/admin", authMiddleware, createAdminReviewController);

router.put("/admin/:id", authMiddleware, updateReviewController);

router.patch("/admin/:id/status", authMiddleware, updateReviewStatusController);

router.patch(
  "/admin/:id/featured",
  authMiddleware,
  updateReviewFeaturedController,
);

router.delete("/admin/:id", authMiddleware, deleteReviewController);

export default router;
