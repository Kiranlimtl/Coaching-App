import express from 'express';
import { ClassController } from '../controllers/classController.js';
import { validateData, validateQuery } from '../middleware/validateMiddleware.js';
import { authenticateCoach } from '../middleware/authMiddleware.js';
import { createClassSchema, updateClassSchema, getClassQuerySchema } from '../schemas/classSchema.js';

const router = express.Router();

router.post('/', authenticateCoach, validateData(createClassSchema), ClassController.create);

router.get('/', authenticateCoach, validateQuery(getClassQuerySchema), ClassController.listClasses);

router.get('/list-item', authenticateCoach, ClassController.getClassesAsListItemPerCoach);

router.get('/:id', authenticateCoach, ClassController.getClass);

router.patch('/:id', authenticateCoach, validateData(updateClassSchema), ClassController.updateClass);

router.delete('/:id', authenticateCoach, ClassController.deleteClass);



export default router;