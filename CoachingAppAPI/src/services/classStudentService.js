import { ClassStudentModel } from "../models/classStudentModel.js";
import CustomError from "../utils/CustomError.js";
import { ClassService } from "./classService.js";
import { StudentService } from "./studentService.js";


export const ClassStudentService = {
    async create({ classId, studentId }) {
        const session = await ClassService.getClass(classId);
        const student = await StudentService.getProfile(studentId);

        const exist = await ClassStudentModel.findByBoth(classId, studentId);
        if (exist) {
            throw new CustomError("Student already belong in the class", 409)
        }
        
        const classStudent = await ClassStudentModel.create({ class_id: classId, student_id: studentId});
        return classStudent;
    },

    async remove(classId, studentId) {
        const exist = await ClassStudentService.getClassStudent(classId, studentId);
        await ClassStudentModel.remove(classId, studentId);
        return { message: "Student has been removed from the class"};
    },

    async getClassStudent(classId, studentId) {
        const classStudent = await ClassStudentModel.findByBoth(classId, studentId);
        if (!classStudent) {
            throw new CustomError("Student is not enrolled in this class", 404);
        }
        return classStudent;
    },

    async listClassStudent(filters) {
        console.log(filters);
        const classStudents = await ClassStudentModel.listClassStudents(filters);
        return classStudents;
    }
}