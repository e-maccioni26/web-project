import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';

const router = Router();

router.post('/', ProjectController.createProject);
router.get('/', ProjectController.getProjects);
router.get('/:id', ProjectController.getProjectById);
router.put('/:id', ProjectController.updateProject);
router.delete('/:id', ProjectController.deleteProject);
router.get('/:id/users', ProjectController.getProjectUsers);
router.post('/:id/users', ProjectController.addUsers);
router.delete('/:id/users', ProjectController.removeUsers);


export default router;
