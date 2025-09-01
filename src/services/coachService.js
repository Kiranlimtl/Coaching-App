import { CoachModel } from '../models/coachModel.js';
import admin from '../config/firebase.js';
import CustomError from '../utils/CustomError.js';
import ERROR_MESSAGES from '../constants/errorMessages.js';

export const CoachService = {
    async register({ name, email, password, phone =  null, level = null, isHeadCoach = false }) {

        try {
            const userRecord = await admin.auth().createUser({
                email,
                password,
                displayName: name,
            });

            const firebaseUid = userRecord.uid;
    
            const coach = await CoachModel.create({
                name,
                email,
                phone,
                firebase_uid: firebaseUid,
                level,
                is_head_coach: isHeadCoach
            })

        return coach;
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    async login(uid) {
        try {
            const coach = await CoachModel.findByFirebaseUID(uid);
            if (!coach) {
                throw new CustomError(ERROR_MESSAGES.COACH_NOT_FOUND, 404);
            }
            return coach;
        } catch (error) {
            throw new CustomError(ERROR_MESSAGES.INVALID_TOKEN, 401);
        }
    },

    async getProfile(coachId) {
        console.log(coachId)
        const coach = await CoachModel.findById(coachId) 
        console.log(coach)
        if (!coach) {
            throw new CustomError(ERROR_MESSAGES.COACH_NOT_FOUND, 404);
        }

        return {
            id: coach.id,
            name: coach.name,
            email: coach.email,
            createdAt: coach.created_at
        }
    },

    async updateProfile(coachId, updates) {
        const currentCoach = await CoachModel.findById(coachId);

        if (!currentCoach) {
            throw new CustomError(ERROR_MESSAGES.COACH_NOT_FOUND, 404);
        }
        
        const fieldsToCheck = ["name", "email", "phone", "level", "is_head_coach"];
        const unchangedField = []
        for (const field of fieldsToCheck) {
            if (field in updates) {
                if (updates[field] === currentCoach[field]) {
                    unchangedField.push(field)
                }
            }
        }

        if (unchangedField.length === Object.keys(updates).length) {
            throw new CustomError(`No changes detected. Fields [${unchangedField.join(', ')}] have the same values`, 400);
        }

        unchangedField.forEach(field => delete updates[field])

        if (updates.email) {
            const existingCoach = await CoachModel.findByEmail(updates.email)
            if (existingCoach && existingCoach.id !== coachId) {
                throw new CustomError('Email already in use', 400);
            }
        }

        if (Object.keys(updates).length === 0) {
            throw new CustomError("No changes to apply after validation", 400);
        }

        updates.updated_at = new Date()
        const updatedCoach = await CoachModel.update(coachId, updates);

        return {
            id: updatedCoach.id,
            name: updatedCoach.name,
            email: updatedCoach.email,
            phone: updatedCoach.phone,
            level: updatedCoach.level,
            isHeadCoach: updatedCoach.is_head_coach
        }
    },

    async delete(coachId) {
        const coach = await CoachModel.findById(coachId);
        if (!coach) {
            throw new CustomError(ERROR_MESSAGES.COACH_NOT_FOUND, 404)
        }

        try {
            await admin.auth().deleteUser(coach.firebase_uid)
            await CoachModel.delete(coachId);
            return { message: "Coach deleted successfully"}
        } catch (error) {
            console.error("Failed to delete Firebase coach and databse", error)
            throw new CustomError(ERROR_MESSAGES.DELETE_COACH_FAIL, 500)
        }
    },

    async getCoaches(filters) {
        try {
            console.log(filters)
            const coaches = await CoachModel.getCoaches(filters);
            return coaches;
        } catch (error) {
            console.error("Failed to fetch coaches", error);
            throw new CustomError(ERROR_MESSAGES.FETCH_COACHES_FAIL || "Failed to get coaches", 500);
        }
    }
    
}