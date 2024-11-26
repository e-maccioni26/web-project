import { Router } from "express";
import { notifyController } from "./notify.controller";

const router = Router();

router.post("/", notifyController.send);
export default router;