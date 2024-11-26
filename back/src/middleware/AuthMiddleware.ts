import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";

class AuthMiddleware{
    verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(401).json({ error: "Token missing" });
            return
        }
      
        const decoded = AuthService.verifyToken(token);
        if (!decoded) {
            res.status(401).json({ error: "Invalid or expired token" });
            return
        }
      
        req.user = decoded;
        next();
    };
}
export default new AuthMiddleware();