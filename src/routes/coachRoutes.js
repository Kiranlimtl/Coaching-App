import express from 'express';
import { CoachController } from '../controllers/coachController.js';
import { authenticateCoach } from '../middleware/authMiddleware.js';
import { validateData, validateQuery } from '../middleware/validateMiddleware.js';
import { createCoachSchema, updateCoachSchema, getCoachQuerySchema} from '../schemas/coachSchema.js';

const router = express.Router();

router.post('/register', validateData(createCoachSchema), CoachController.register);
router.post('/login', authenticateCoach, CoachController.login);

router.get('/me', authenticateCoach, CoachController.getProfile);
router.patch('/me', authenticateCoach, validateData(updateCoachSchema), CoachController.updateProfile);
router.delete('/me', authenticateCoach, CoachController.deleteProfile)

router.patch('/:id', authenticateCoach, validateData(updateCoachSchema), CoachController.updateProfile);

router.get('/', authenticateCoach, validateQuery(getCoachQuerySchema), CoachController.listCoaches);

export default router;