import TagController from '../controllers/TagController';
import { Router } from 'express';

const router = Router();

router.post('/', TagController.createTag);
router.get('/', TagController.getTags);
router.get('/:id', TagController.getTagById);
router.put('/:id', TagController.updateTag);
router.delete('/:id', TagController.deleteTag);
