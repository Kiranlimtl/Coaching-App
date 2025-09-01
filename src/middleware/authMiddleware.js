import admin from '../config/firebase.js'
import CustomError from '../utils/CustomError.js';
import ERROR_MESSAGES from '../constants/errorMessages.js';
import { CoachModel } from '../models/coachModel.js';
 
export const authenticateCoach = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomError(ERROR_MESSAGES.INVALID_TOKEN, 401);
    }

    const idToken = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const coach = await CoachModel.findByFirebaseUID(decodedToken.uid);
    if (!coach) throw new CustomError(ERROR_MESSAGES.COACH_NOT_FOUND, 404);

    req.user = {
      id: coach.id,
      uid: decodedToken.uid,
      isHeadCoach: coach.is_head_coach,
    };

    next();
  } catch (error) {
    next(new CustomError(ERROR_MESSAGES.INVALID_TOKEN, 401));
  }
};