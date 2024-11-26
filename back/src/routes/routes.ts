import express from 'express';
import UserRoutes from './UserRoutes';
import ProjectRoutes from './ProjectRoutes';
import TacheRoutes from './TacheRoutes';

const router = express.Router();

router.use('/users', UserRoutes);
router.use('/projects', ProjectRoutes);
router.use('/taches', TacheRoutes);

router.get('/', async (req, res) => {
    res.send('Hello World!');
});

export default router;