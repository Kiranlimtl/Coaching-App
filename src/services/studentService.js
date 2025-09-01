import { StudentModel } from "../models/studentModel.js";
import CustomError from "../utils/CustomError.js";
import ERROR_MESSAGES from "../constants/errorMessages.js";

export const StudentService = {
    async create({ name, phone = null }) {
        try {
            const student = await StudentModel.create({
                name,
                phone
            });

            return student;
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    async getProfile(id) {
        const student = await StudentModel.findById(id);
        if (!student) {
            throw new CustomError(ERROR_MESSAGES.STUDENT_NOT_FOUND, 404);
        }

        return {
            id: student.id,
            name: student.name,
            phone: student.phone,
            createdAt: student.created_at
        }
    },

    async updateProfile(id, updates) {
        const currentStudent = await StudentModel.findById(id);

        if (!currentStudent) {
            throw new CustomError(ERROR_MESSAGES.STUDENT_NOT_FOUND, 404);
        }

        const fieldsToCheck = ["name", "phone"];
        const unchangedField = []
        for (const field of fieldsToCheck) {
            if (field in updates) {
                if (updates[field] === currentStudent[field]) {
                    unchangedField.push(field)
                }
            }
        }

        if (unchangedField.length === Object.keys(updates).length) {
            throw new CustomError(`No changes detected. Fields [${unchangedField.join(', ')}] have the same values`, 400);
        }

        if (Object.keys(updates).length === 0) {
            throw new CustomError("No changes to apply after validation", 400);
        }

        updates.updated_at = new Date();
        const updatedStudent = await StudentModel.update(id, updates);

        return {
            id: updatedStudent.id,
            name: updatedStudent.name,
            phone: updatedStudent.phone,
            updatedAt: updatedStudent.updated_at
        };
    },

    async delete(id) {
        const student = await StudentModel.findById(id);
        if (!student) {
            throw new CustomError(ERROR_MESSAGES.STUDENT_NOT_FOUND, 404);
        }

        try {
            await StudentModel.delete(id)
            return { message: "Student deleted successfuly"}
        } catch (error) {
            console.error("Failed to delete student", error);
            throw new CustomError(ERROR_MESSAGES.DELETE_STUDENT_FAIL, 500);
        }
    },

    async getStudents(filters) {
        try {
            console.log(filters)
            const students = await StudentModel.getStudents(filters);
            return students
        } catch (error) {
            console.error("Failed to fetch students", error);
            throw new CustomError(ERROR_MESSAGES.FETCH_STUDENTS_FAIL, 500);
        }
    }
}