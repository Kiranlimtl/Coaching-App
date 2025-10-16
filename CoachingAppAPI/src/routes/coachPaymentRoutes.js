import express from 'express';
import { CoachPaymentController } from '../controllers/coachPaymentController.js';
import { authenticateCoach } from '../middleware/authMiddleware.js';
import { validateData, validateQuery } from '../middleware/validateMiddleware.js';
import { createCoachPaymentSchema, updateCoachPaymentSchema, getCoachPaymentQuerySchema } from '../schemas/coachPaymentSchema.js';

const router = express.Router();

router.post('/', authenticateCoach, validateData(createCoachPaymentSchema), CoachPaymentController.create);
router.get('/:id', authenticateCoach, CoachPaymentController.getCoachPayment);
router.get('/', authenticateCoach, validateQuery(getCoachPaymentQuerySchema), CoachPaymentController.listCoachPayments);
router.patch('/:id/mark-as-paid', authenticateCoach, CoachPaymentController.markAsPaid);
router.delete('/:id', authenticateCoach, CoachPaymentController.remove);
//router.patch('/:id', authenticateCoach, validateData(updateCoachPaymentSchema), CoachPaymentController.update);

export default router;