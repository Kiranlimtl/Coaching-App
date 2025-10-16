import { CoachPaymentModel } from "../models/coachPaymentModel.js";
import { intervalToHours } from "../utils/timeUtils.js";
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
            const coach = await CoachService.getProfile(coachId);
            if (!coach) {
                throw new CustomError(ERROR_MESSAGES.COACH_NOT_FOUND, 404);
            }
            const session = await ClassService.getClass(classId);
            if (!session) {
                throw new CustomError(ERROR_MESSAGES.CLASS_NOT_FOUND, 404);
            }

            const existingPayment = await CoachPaymentModel.findByClassId(classId);
            if (existingPayment) {
                throw new CustomError(ERROR_MESSAGES.PAYMENT_ALREADY_EXISTS_FOR_CLASS, 400);
            }
            
            if (session.coach_id !== coachId) {
                throw new CustomError(ERROR_MESSAGES.COACH_NOT_ASSIGNED_TO_CLASS, 400);
            }
            const levelId = coach.level;
            const levelRate = Number(await LevelService.getLevelRateById(levelId));

            const students = await ClassStudentService.listClassStudent(classId);
            
            const numStudents = students.length;
            if (numStudents === 0) {
                throw new CustomError(ERROR_MESSAGES.NO_STUDENTS_IN_CLASS, 400);
            }
            const duration = session.duration;
            const durationHours = intervalToHours(duration);
            const rateTierId = await RateTierService.getRateTierIdByNumStudents(numStudents);
            const ratePerHour = Number(await RateTierService.getRatePerHour(rateTierId));
            const finalRate = ratePerHour * levelRate;
            const totalAmount = finalRate * durationHours;

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

    async getCoachPayment(id, coach) {
        const payment = await CoachPaymentModel.findById(id);
        if (!payment) {
            throw new CustomError(ERROR_MESSAGES.PAYMENT_NOT_FOUND, 404);
        }

        if (!coach.isHeadCoach && payment.coach_id !== coach.id) {
            throw new CustomError(ERROR_MESSAGES.UNAUTHORIZED, 403);
        }
    }, 

    async listCoachPayments(filters, coach) {
        const finalFilters = coach.isHeadCoach
            ? filters
            : {...filters, coachId: coach.id };
        const payments = await CoachPaymentModel.listCoachPayments(finalFilters);
        return payments;
    }, 

    async markasPaid(coach, id) {
        const payment = await CoachPaymentModel.findById(id);
        if (!coach.isHeadCoach) {
            console.log("Not head coach");
            throw new CustomError(ERROR_MESSAGES.UNAUTHORIZED, 403);
        }

        if (!payment) {
            throw new CustomError(ERROR_MESSAGES.PAYMENT_NOT_FOUND, 404);
        }
        if (payment.is_paid) {
            throw new CustomError(ERROR_MESSAGES.PAYMENT_ALREADY_PAID, 400);
        }

        const updatedPayment = await CoachPaymentModel.update(id, { is_paid: true, payment_date: new Date() });
        return updatedPayment;
    },

    async remove(coach, id) {
        if (!coach.isHeadCoach) {
            throw new CustomError(ERROR_MESSAGES.UNAUTHORIZED, 403);
        }
        const payment = await CoachPaymentModel.findById(id);
        if (!payment) {
            throw new CustomError(ERROR_MESSAGES.PAYMENT_NOT_FOUND, 404);
        }
        const result = await CoachPaymentModel.delete(id);
        return result;
    },

    async update(id, updates) {
        const payment = await CoachPaymentModel.findById(id);
        if (!payment) {
            throw new CustomError(ERROR_MESSAGES.PAYMENT_NOT_FOUND, 404);
        }

        const fieldsToCheck = ["coachId", "classId", "isPaid", "paymentDate"];
        const unchangedField = []

        for (const field of fieldsToCheck) {
            if (field in updates) {
                if (updates[field] === payment[field]) {
                    unchangedField.push(field)
                } 
            }
        }
        if (unchangedField.length === Object.keys(updates).length) {
            throw new CustomError(ERROR_MESSAGES.NO_CHANGES_DETECTED, 400);
        }
        unchangedField.forEach(field => delete updates[field]);

        if (Object.keys(updates).length === 0) {
            throw new CustomError(ERROR_MESSAGES.NO_CHANGES_TO_APPLY, 400);
        }

        updates.updated_at = new Date();
        const updatedPayment = await CoachPaymentModel.update(id, updates);
        return {
            id: updatedPayment.id,
            coachId: updatedPayment.coach_id,
            classId: updatedPayment.class_id,
            isPaid: updatedPayment.is_paid,
            paymentDate: updatedPayment.payment_date,
        }


    }

}