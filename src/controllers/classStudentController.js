import { ClassStudentService } from "../services/classStudentService.js";

export const ClassStudentController = {
    async create(req, res, next) {
        try {
            const { classId, studentId } = req.body;
            const classStudent = await ClassStudentService.create({ classId, studentId});
            res.status(201).json({ message: 'Student added to class', classStudent});
        } catch (error) {
            next(error);
        }
    },

    async getClassStudent(req, res, next) {
        try {
            const { classId, studentId } = req.params;
            const classStudent = await ClassStudentService.getClassStudent(classId, studentId);
            res.status(200).json(classStudent);
        } catch (error) {
            next(error);
        }
    },

    async listClassStudent(req, res, next) {
        try {
            const filters = req.query;
            const classStudents = await ClassStudentService.listClassStudent(filters);
            res.status(200).json({ classStudents });
        } catch (error) {
            next(error);
        }
    },

    async removeClassStudent(req, res, next) {
        try {
            const { classId, studentId } = req.params;
            const result = await ClassStudentService.remove(classId, studentId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

}