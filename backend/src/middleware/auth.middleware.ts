import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthAdmin } from "../types/admin.js";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
      return;
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      res.status(401).json({
        success: false,
        message: "Invalid authorization header.",
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not configured.");
    }

    const decoded = jwt.verify(token, jwtSecret);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      typeof decoded.adminId !== "number" ||
      typeof decoded.email !== "string"
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid token payload.",
      });
      return;
    }

    const admin: AuthAdmin = {
      adminId: decoded.adminId,
      email: decoded.email,
    };

    req.admin = admin;

    next();
  } catch (error) {
    console.error(error);

    res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;