import { StudentService } from "../services/studentService.js";

export const StudentController = {
    async create(req, res, next) {
        try {
            console.log('Creating student');
            const { name, phone } = req.body;
            const student = await StudentService.create({ name, phone });
            res.status(201).json({ message: 'Student created successfully', student})
        } catch (error) {
            next(error);
        }
    },

    async getProfile(req, res, next) {
        try {
            console.log('Getting student profile')
            const id = parseInt(req.params.id);
            console.log(id)
            const student = await StudentService.getProfile(id)
            res.status(200).json({ student });
        } catch (error) {
            next(error);
        }
    },

    async deleteProfile(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            await StudentService.delete(id);
            res.status(200).json({ message: 'Student deleted successfully'});
        } catch (error) {
            next(error);
        }
    },

    async listStudents(req, res, next) {
        try {
            const filters = req.query;
            const students = await StudentService.getStudents(filters);
            res.status(200).json({ students })
        } catch (error) {
            next(error);
        }
    },

    async updateProfile(req, res, next) {
        try {
            const id = parseInt(req.params.id)
            const updates = {};
            console.log(req.body);

            if (req.body.name) updates.name = req.body.name;
            if (req.body.phone) updates.phone = req.body.phone;

            const updatedStudent = await StudentService.updateProfile(id, updates);
            res.status(200).json({ message: 'Student succsesfully updated', student: updatedStudent});
        } catch (error) {
            next(error);
        }
    }
}