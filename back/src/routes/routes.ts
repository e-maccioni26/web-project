import express from 'express';
import UserRoutes from './UserRoutes';
import ProjectRoutes from './ProjectRoutes';
import TacheRoutes from './TacheRoutes';
import AuthRoutes from '../modules/auth/auth.routes'
import NotifyRoutes from '../modules/notify/notify.routes'
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