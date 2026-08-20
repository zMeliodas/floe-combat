import { Router } from "express";
import { uploadImage } from "../middleware/upload.js";
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
  uploadImage.single("image"),
  createProductController,
);
router.patch(
  "/:id",
  authMiddleware,
  uploadImage.single("image"),
  updateProductController,
);
router.delete("/:id", authMiddleware, deleteProductController);

export default router;
