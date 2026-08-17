import { Router } from "express";
import { uploadImage } from "../middleware/upload.js";
import {
  createProductController,
  deleteProductController,
  getProductsController,
  updateProductController,
} from "../controller/product.controller.js";

const router = Router();

router.get("/", getProductsController);
router.post("/", uploadImage.single("image"), createProductController);
router.patch("/:id", uploadImage.single("image"), updateProductController);
router.delete("/:id", deleteProductController);

export default router;