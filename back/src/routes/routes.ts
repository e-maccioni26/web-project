import express from 'express';
import UserRoutes from './UserRoutes';
import ProjectRoutes from './ProjectRoutes';
import TacheRoutes from './TacheRoutes';
import AuthRoutes from './AuthRoutes'
import NotifyRoutes from './NortifyRoutes'
import TagRoutes from './TagRoutes'
const router = express.Router();

router.use('/users', UserRoutes);
router.use('/projects', ProjectRoutes);
router.use('/taches', TacheRoutes);
router.use('/auth', AuthRoutes);
router.use('/notify', NotifyRoutes);
router.use('/tags', TagRoutes);

router.get('/', async (req, res) => {
    res.send('running!');
});

export default router;