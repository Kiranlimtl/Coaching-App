import express from 'express';
import { StudentController } from '../controllers/studentController.js';
import { validateData, validateQuery } from '../middleware/validateMiddleware.js';
import { requireHeadCoach } from '../middleware/requireHeadCoachMiddleware.js';
import { authenticateCoach } from '../middleware/authMiddleware.js';
import { createStudentSchema, updateStudentSchema, getStudentQuerySchema } from '../schemas/studentSchema.js';

const router = express.Router();

router.post('/', authenticateCoach, validateData(createStudentSchema), StudentController.create);

router.get('/', authenticateCoach, validateQuery(getStudentQuerySchema), StudentController.listStudents);

router.get('/:id', authenticateCoach, StudentController.getProfile);

router.patch('/:id', authenticateCoach, validateData(updateStudentSchema), StudentController.updateProfile);

router.delete('/:id', authenticateCoach, requireHeadCoach, StudentController.deleteProfile);

export default router;