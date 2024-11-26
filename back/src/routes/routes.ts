import express from 'express';
import UserRoutes from './UserRoutes';
import ProjectRoutes from './ProjectRoutes';
import TacheRoutes from './TacheRoutes';
import AuthRoutes from './AuthRoutes'
import NotifyRoutes from './NortifyRoutes'
const router = express.Router();

router.use('/users', UserRoutes);
router.use('/projects', ProjectRoutes);
router.use('/taches', TacheRoutes);
router.use('/auth', AuthRoutes);
router.use('/notify', NotifyRoutes);

router.get('/', async (req, res) => {
    res.send('Hello World!');
});

export default router;