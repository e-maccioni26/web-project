import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:id/taches', UserController.getUserTaches);
router.get('/:id/projects', UserController.getUserProjects);
router.get('/:id', UserController.getUserById);
router.delete('/:id', UserController.deleteUser);
router.put('/:id', UserController.updateUser);

export default router;
