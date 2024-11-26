import { Router } from 'express';
import NotifyController from '../controllers/NotifyController';

const router = Router();

router.post('/', NotifyController.send);
export default router;
