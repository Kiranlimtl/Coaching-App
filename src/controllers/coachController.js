import { CoachService } from "../services/coachService.js";

export const CoachController = {
    async register(req, res, next) {
        try {
            console.log('Registering user');
            const { name, email, password, phone, level, isHeadCoach } = req.body;
            const coach = await CoachService.register({ name, email, password, phone, level, isHeadCoach });
            res.status(201).json({ message: 'Coach created successfully', coach})
        } catch (error) {
            next(error);
        }
    },

    async login(req, res, next) {
        try {
            console.log('Loggin in user');
            console.log(req.user.uid)
            const coach = await CoachService.login(req.user.uid)
            res.status(200).json({ message: 'Logging in successful', coach }) 
        } catch (error) {
            next(error);
        }
    },

    async getProfile(req, res, next) {
        try {
            console.log('Getting coach profile') 
            const coachId = req.user.id;
            console.log(coachId)
            const coach = await CoachService.getProfile(coachId);
            res.status(200).json({ coach })
        } catch (error) {
            next(error)
        }
    },

    async deleteProfile(req, res, next) {
        try {
            const coachId = req.user.id;
            await CoachService.delete(coachId);
            res.status(200).json({ message: 'Coach delete successfully' })
        } catch (error) {
            next(error);
        }
    },

    async updateProfile(req, res, next) {
        try {
            const requesterId = req.user.id;
            const isHeadCoach = req.user.isHeadCoach;
            const targetCoachId = req.params.id ? parseInt(req.params.id) : requesterId;
            const updates = {};
            console.log(req.body)

            if (!isHeadCoach && targetCoachId !== requesterId) {
                return res.status(403).json({ error: "You cannot update another coach's profile" });
            }

            if (req.body.name) updates.name = req.body.name;
            if (req.body.email) updates.email = req.body.email;
            if (req.body.phone) updates.phone = req.body.phone;

            if (req.body.level !== undefined) {
                if (!isHeadCoach) {
                    return res.status(403).json({ error: "Only head coaches can update 'level'" });
                }
                updates.level = req.body.level;
            }

            if (req.body.isHeadCoach !== undefined) {
                if (!req.user.isHeadCoach) {
                    return res.status(403).json({ error: "Only head coaches can update 'isHeadCoach'" });
                }
                updates.is_head_coach = req.body.isHeadCoach
            }
            const updatedCoach = await CoachService.updateProfile(targetCoachId, updates)
            res.status(200).json({ message: 'Coach updated successfully', coach: updatedCoach})
        } catch (error) {
            next(error)
        }
    },

    async listCoaches(req, res, next) {
        try {
            const filters = req.query;
            const coaches = await CoachService.getCoaches(filters);
            console.log(coaches)
            res.status(200).json({ coaches })
        } catch (error) {
            next(error);
        }
    }
}