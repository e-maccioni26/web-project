import { Router } from 'express';
import TacheController from '../controllers/TacheController';
// import UserTachesController from '../controllers/UserTachesController';




const router = Router();

// router.post('/', UserTachesController.createUserTache);


// affecter tache a un user
// router.get('/byUser', UserTachesController.getUserTaches);
router.post('/', TacheController.createTache);
router.get('/', TacheController.getTaches);
router.get('/:id', TacheController.getTacheById);
router.put('/:id', TacheController.updateTache);
router.delete('/:id', TacheController.deleteTache);

export default router;
