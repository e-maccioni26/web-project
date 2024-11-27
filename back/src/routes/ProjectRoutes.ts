import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';

const router = Router();

router.post('/', ProjectController.createProject);
router.get('/', ProjectController.getProjects);
router.get('/:id', ProjectController.getProjectById);
router.get('/:id/users', ProjectController.getProjectUsers);
router.put('/:id', ProjectController.updateProject);
router.delete('/:id', ProjectController.deleteProject);

export default router;
