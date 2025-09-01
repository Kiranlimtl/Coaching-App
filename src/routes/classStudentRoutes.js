import express from 'express';
import { ClassStudentController } from '../controllers/classStudentController.js';
import { validateData, validateQuery } from '../middleware/validateMiddleware.js';
import { authenticateCoach } from '../middleware/authMiddleware.js';
import { createClassStudentSchema, listClassStudentQuerySchema } from '../schemas/classStudentSchema.js';

const router = express.Router();

router.post('/', authenticateCoach, validateData(createClassStudentSchema), ClassStudentController.create);

router.get('/classes/:classId/students/:studentId', authenticateCoach, ClassStudentController.getClassStudent);

router.get('/', authenticateCoach, validateQuery(listClassStudentQuerySchema), ClassStudentController.listClassStudent);

router.delete('/classes/:classId/students/:studentId', authenticateCoach, ClassStudentController.removeClassStudent);

export default router;