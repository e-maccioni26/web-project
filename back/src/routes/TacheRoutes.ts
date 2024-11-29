import { Router } from 'express';
import TacheController from '../controllers/TacheController';
// import UserTachesController from '../controllers/UserTachesController';




const router = Router();

// router.post('/', UserTachesController.createUserTache);


// affecter tache a un user
// router.get('/byUser', UserTachesController.getUserTaches);
router.get('/', TacheController.getTaches);
router.post('/', TacheController.createTache);
router.get('/:id', TacheController.getTacheById);
router.put('/:id', TacheController.updateTache);
router.delete('/:id', TacheController.deleteTache);
router.get('/:id/tags', TacheController.getTags);
router.post('/:id/tags', TacheController.addTags);
router.delete('/:id/tags', TacheController.removeTags);
router.get('/:id/users', TacheController.getUsers);
router.post('/:id/users', TacheController.addUsers);
router.delete('/:id/users', TacheController.removeUsers);

export default router;
