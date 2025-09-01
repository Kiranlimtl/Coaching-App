import { ClassModel } from "../models/classModel.js";
import CustomError from "../utils/CustomError.js";
import ERROR_MESSAGES from "../constants/errorMessages.js";

export const ClassService = {
    async create({ name, originalCoachId, currentCoachId, startTime, endTime }) {
        try {
            const actualCurrentCoachId = currentCoachId ?? originalCoachId;

            const start = new Date(startTime);
            const end = new Date(endTime);

            const durationMinutes = Math.round((end - start) / (1000 * 60));
            const duration = `${durationMinutes} minutes`;

            const session = await ClassModel.create({
                name,
                original_coach_id: originalCoachId,
                current_coach_id: actualCurrentCoachId,
                start_time: startTime,
                end_time: endTime,
                duration
            });

            return session;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    async getClass(id) {
        const session = await ClassModel.findById(id);
        if (!session) {
            throw new CustomError(ERROR_MESSAGES.CLASS_NOT_FOUND, 404);
        }

        return {
            id: session.id,
            name: session.name,
            currentCoachId: session.currentCoachId,
            startTime: session.start_time,
            endTime: session.end_time,
            duration: session.duration,
            updateAt: session.updated_at
        }
    },

    async updateClass(id, updates) {
        const currentSession = await ClassModel.findById(id);
        const { start_time, end_time } = updates
        console.log(start_time, end_time)

        if (!currentSession) {
            throw new CustomError(ERROR_MESSAGES.CLASS_NOT_FOUND, 404);
        }

        const fieldsToCheck =["name", "current_coach_id", "start_time", "end_time", "duration"];
        const unchangedField = []
        console.log(unchangedField)

        for (const field of fieldsToCheck) {
            if (field in updates) {
                console.log(updates[field])
                console.log(currentSession[field])
                if (updates[field] === currentSession[field]) {
                    unchangedField.push(field);
                }
                if (
                    (field === 'start_time' || field === 'end_time') &&
                    new Date(updates[field]).getTime() === new Date(currentSession[field]).getTime()
                    ) {
                    unchangedField.push(field);
                }
            }
        }

        if (unchangedField.length === Object.keys(updates).length) {
            throw new CustomError(`No changes detected. Fields [${unchangedField.join(', ')}] have the same values`, 400)
        }

        unchangedField.forEach(field => delete updates[field])


        if (Object.keys(updates).length === 0) {
            throw new CustomError("No changes to apply after validation", 400);
        }

        if (start_time || end_time) {
            const start = new Date(start_time || currentSession.start_time);
            const end = new Date(end_time || currentSession.end_time);

            const durationMinutes = Math.round((end - start) / (1000 * 60));
            const duration = `${durationMinutes} minutes`;
            updates.start_time = start;
            updates.end_time = end;
            updates.duration = duration;
        }

        console.log(updates)

        updates.updated_at = new Date()
        const updatedSession = await ClassModel.update(id, updates);

        return {
            id: updatedSession.id,
            name: updatedSession.name,
            currentCoachId: updatedSession.current_coach_id,
            startTime: updatedSession.start_time,
            endTime: updatedSession.end_time,
            duration: updatedSession.duration,
            updatedAt: updatedSession.updated_at
        }
    },

    async delete(id) {
        const session = await ClassModel.findById(id);

        if (!session) {
            throw new CustomError(ERROR_MESSAGES.CLASS_NOT_FOUND, 404);
        }

        try {
            await ClassModel.delete(id);
            return { message: "Class deleted successfully"}
        } catch (error) {
            console.error("Failed to delete class", error);
            throw new CustomError(ERROR_MESSAGES.DELETE_CLASS_FAIL, 500);
        }
    },

    async getClasses(filters) {
        try {
            const sessions = await ClassModel.getClasses(filters);
            return sessions
        } catch (error) {
            throw new CustomError(ERROR_MESSAGES.FETCH_CLASSES_FAIL, 500);
        }
    }
}