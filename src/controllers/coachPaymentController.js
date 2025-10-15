import { CoachPaymentService } from "../services/coachPaymentService.js";

export const CoachPaymentController = {
    async create(req, res, next) {
        try {
            console.log("Creating coach payment");
            const coachId = req.user.id;
            const { classId, isPaid, paymentDate } = req.body;
            const payment = await CoachPaymentService.create({ coachId, classId, isPaid, paymentDate });
            res.status(201).json({ message: "Coach payment created successfully", payment });
        } catch (error) {
            next(error);
        }
    },

    async getCoachPayment(req, res, next) {
        try {
            console.log("Getting coach payment information");
            const id = parseInt(req.params.id);
            const coach = req.user;
            const payment = await CoachPaymentService.getCoachPayment(id, coach);
            res.status(200).json({ payment });
        } catch (error) {
            next(error);
        }
    },

    async listCoachPayments(req, res, next) {
        try {
            const filters = req.query;
            const coach = req.user;
            const payments = await CoachPaymentService.listCoachPayments(filters, coach);
            res.status(200).json({ payments });
        } catch (error) {
            next(error);
        }
    },

    async markAsPaid(req, res, next) {
        try {
            const coach = req.user;
            const id = parseInt(req.params.id);
            await CoachPaymentService.markasPaid(coach, id);
            res.status(200).json({ message: "Coach payment marked as paid successfully" });
        } catch (error) {
            next(error);
        }
    },

    async remove(req, res, next) {
        try {
            const coach = req.user;
            const id = parseInt(req.params.id);
            await CoachPaymentService.remove(coach, id);
            res.status(200).json({ message: "Coach payment removed successfully" });
        } catch (error) {
            next(error);
        }
    }, 

    async update(req, res, next) {
        try {
            const id = parseInt(req.params.id);

            function mapKeysToSnakeCase(updates) {
                const keyMap = {
                    coachId: 'coach_id',
                    classId: 'class_id',
                    isPaid: 'is_paid',
                    paymentDate: 'payment_date'
                };

                return Object.fromEntries(
                    Object.entries(updates).map(([key, value]) => [keyMap[key] || key, value])
                );
            }

            console.log(req.body);

            const updatesSnakeCase =  mapKeysToSnakeCase(req.body)

            const updatedPayment = await CoachPaymentService.update(id, updatesSnakeCase);

            res.status(200).json({
                message: 'Coach payment updated successfully',
                payment: updatedPayment
            });
        } catch (error) {
            next(error);
        }
    }
}