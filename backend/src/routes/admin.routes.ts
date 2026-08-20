import { Router } from "express";
import { loginAdminController, getAdminActivitiesController } from "../controller/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js"

const router = Router();

router.post("/login", loginAdminController);
router.get("/", authMiddleware, getAdminActivitiesController);

export default router;
