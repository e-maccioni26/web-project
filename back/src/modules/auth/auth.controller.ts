import { Request, Response } from "express";
import { authService } from "./auth.service";

export const authController = {
  login: async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    if (username === "admin" && password === "password") {
      const token = authService.generateToken({ username });
      return res.json({ token });
    }

    return res.status(401).json({ error: "Invalid credentials" });
  },
};