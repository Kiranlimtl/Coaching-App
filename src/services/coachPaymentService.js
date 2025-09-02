import { CoachPaymentModel } from "../models/coachPaymentModel.js";
import { RateTierService } from "./rateTierService.js";
import { CoachService } from "./coachService.js";
import { ClassService } from "./classService.js";
import { ClassStudentService } from "./classStudentService.js";
import CustomError from "../utils/CustomError.js";
import ERROR_MESSAGES from "../constants/errorMessages.js";

export const CoachPaymentService = {
    async create({ coachId, classId, isPaid, paymentDate }) {
        try {
            const coach = await CoachService.getCoach(coachId);
            if (!coach) {
                throw new CustomError(ERROR_MESSAGES.COACH_NOT_FOUND, 404);
            }
            const session = await ClassService.getClass(classId);
            if (!session) {
                throw new CustomError(ERROR_MESSAGES.CLASS_NOT_FOUND, 404);
            }
            const level = coach.level;

            const students = await ClassStudentService.listClassStudent(classId);
            
            const numStudents = students.length;
            if (numStudents === 0) {
                throw new CustomError(ERROR_MESSAGES.NO_STUDENTS_IN_CLASS, 400);
            }
            const duration = session.duration;
            const rateTierId = RateTierService.getRateTierIdByNumStudents(numStudents);
            const rateTier = RateTierService.getRateById(rateTierId);
            

        }
    },

}