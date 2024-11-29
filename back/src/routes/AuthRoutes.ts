import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middleware/AuthMiddleware';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get("/verify", AuthMiddleware.verifyToken, (req, res) => {
    res.json({ message: "You are authorized", user: req.user });
  });
export default router;
