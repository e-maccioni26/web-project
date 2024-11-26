import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.delete('/:id', UserController.deleteUser);
router.get('/taches', UserController.getUserTaches);
router.get('/projects', UserController.getUserProjects);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);

export default router;
