import { CoachPaymentModel } from "../models/coachPaymentModel.js";
import { RateTierService } from "./rateTierService.js";
import { LevelService } from "./levelService.js";
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
            const levelId = coach.level;
            const levelRate = await LevelService.getLevelRateById(levelId);

            const students = await ClassStudentService.listClassStudent(classId);
            
            const numStudents = students.length;
            if (numStudents === 0) {
                throw new CustomError(ERROR_MESSAGES.NO_STUDENTS_IN_CLASS, 400);
            }
            const duration = session.duration;
            const rateTierId = await RateTierService.getRateTierIdByNumStudents(numStudents);
            const ratePerHour = await RateTierService.getRatePerHour(rateTierId);
            const finalRate = ratePerHour * levelRate;
            const totalAmount = finalRate * duration;

            const payment = await CoachPaymentModel.create({
                coachId,
                rateTierId,
                levelId,
                classId,
                numStudents,
                classDuration: duration,
                finalRate,
                totalAmount,
                isPaid,
                paymentDate
            });

            return payment;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

}