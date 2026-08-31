import type { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";

const createUploadSignatureController = (req: Request, res: Response) => {
  const { purpose } = req.body;

  const folders: Record<string, string> = {
    "highlight-media": "floe-combat/highlights",
    "highlight-thumbnail": "floe-combat/highlights/thumbnails",
    "product-image": "floe-combat/products",
  };

  const folder = folders[purpose];

  if (!folder) {
    return res.status(400).json({
      success: false,
      message: "Invalid upload purpose.",
    });
  }

  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder,
    },
    process.env.CLOUDINARY_API_SECRET!,
  );

  return res.status(200).json({
    success: true,
    result: {
      timestamp,
      signature,
      folder,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
    },
  });
};

export { createUploadSignatureController };
