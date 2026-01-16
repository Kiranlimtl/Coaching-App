import { ClassService } from "../services/classService.js";

export const ClassController = {
    async create(req, res, next) {
        try {
            console.log('Creating class');
            const { name, originalCoachId, currentCoachId, startTime, endTime, duration } = req.body;
            const session = await ClassService.create({ name, originalCoachId, currentCoachId, startTime, endTime, duration });
            res.status(201).json({ message: 'Class creates successfully', session})
        } catch (error) {
            next(error);
        }
    },

    async getClass(req, res, next) {
        try {
            console.log('Getting class information');
            const id = parseInt(req.params.id);
            console.log(id);
            const session = await ClassService.getClass(id)
            res.status(200).json({ session });
        } catch (error) {
            next(error);
        }
    },

    async deleteClass(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            await ClassService.delete(id);
            res.status(200).json({ message: 'Class deleted successfully'});
        } catch (error) {
            next(error);
        }
    },

    async listClasses(req, res, next) {
        try {
            const filters = req.query;
            const session = await ClassService.getClasses(filters);
            res.status(200).json({ session });
        } catch (error) {
            next(error);
        }
    },

    async updateClass(req, res, next) {
        try {
            const id = parseInt(req.params.id);

            function mapKeysToSnakeCase(updates) {
                const keyMap = {
                    name: 'name',
                    endTime: 'end_time',
                    startTime: 'start_time',
                    currentCoachId: 'current_coach_id',
                };

                return Object.fromEntries(
                    Object.entries(updates).map(([key, value]) => [keyMap[key] || key, value])
                );
            }

            console.log(req.body);

            const updatesSnakeCase =  mapKeysToSnakeCase(req.body)

            const updatedClass = await ClassService.updateClass(id, updatesSnakeCase);

            res.status(200).json({
                message: 'Class updated successfully',
                class: updatedClass
            });
        } catch (error) {
            next(error);
        }
    },

    async getClassesAsListItemPerCoach(req, res, next) {
        console.log(req.user.id)
        try {
            const coachId = req.user.id;
            if (!coachId) {
                throw new Error("Coach ID not found in request");
            }
            const classesAsListItem = await ClassService.getClassesAsListItemPerCoach(coachId);
            res.status(200).json({ classesAsListItem });
        } catch (error) {
            next(error);
        }
    }
    
}