import { Router } from "express";
import { uploadImage } from "../middleware/upload.middleware.js";
import { uploadProductImage } from "../service/cloudinary.service.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { createUploadSignatureController } from "../controller/upload.controller.js";

const router = Router();

router.post("/images", uploadImage.single("image"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({
      message: "Please send an image using the field name 'image'.",
    });
    return;
  }

  try {
    const uploadedImage = await uploadProductImage(req.file.buffer);

    res.status(201).json({
      message: "Image uploaded successfully.",
      imageUrl: uploadedImage.imageUrl,
      publicId: uploadedImage.publicId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Image upload failed.",
    });
  }
});

router.post("/signature", authMiddleware, createUploadSignatureController);

export default router;
