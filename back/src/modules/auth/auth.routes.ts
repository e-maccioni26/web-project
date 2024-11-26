import { Router } from "express";
import { authController } from "./auth.controller";
import { authMiddleware } from "./auth.middleware";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify", authMiddleware, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});

export default router;