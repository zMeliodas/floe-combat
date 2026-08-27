import { Router } from "express";
import { uploadImage } from "../middleware/upload.middleware.js";
import {
  createProductController,
  deleteProductController,
  getProductsController,
  updateProductController,
} from "../controller/product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getProductsController);

router.post(
  "/",
  authMiddleware,
  uploadImage.array("images", 10),
  createProductController,
);

router.patch(
  "/:id",
  authMiddleware,
  uploadImage.array("images", 10),
  updateProductController,
);

router.delete("/:id", authMiddleware, deleteProductController);

export default router;
