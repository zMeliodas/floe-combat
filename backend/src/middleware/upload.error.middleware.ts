import multer from "multer";
import type { NextFunction, Request, Response } from "express";

const uploadErrorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({
        success: false,
        message: "File is too large.",
      });
      return;
    }

    res.status(400).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof Error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
    return;
  }

  next(error);
};

export { uploadErrorHandler };