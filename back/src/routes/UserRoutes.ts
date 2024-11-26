import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.delete('/:id', UserController.deleteUser);
router.get('/taches', UserController.getUserTaches);
router.get('/projects', UserController.getUserProjects);
router.post('/taches', UserController.addUserTache);
router.delete('/taches/:tacheId', UserController.removeUserTache);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);

export default router;
