import { z } from 'zod';

export const coachSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Name should be longer").max(255),
    email: z.string().email("Invalid email"),
    phone: z.string().max(20).optional(),
    firebaseUid: z.string().min(1,"Firebase UID is required"),
    level: z.number().int().nullable().optional(),
    isHeadCoach: z.boolean().optional(),
    
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional()
});

export const createCoachSchema = z.object({
    email: z.string().email("Invalid email"),
    firebaseUid: z.string().min(1,"Firebase UID is required"),
    name: z.string().optional()
});

export const updateCoachSchema = z.object({
    name: z.string().min(1, "Name should be longer").max(255).optional(),
    email: z.string().email("Invalid email").optional(),
    phone: z.string().max(20).optional(),
    level: z.number().int().nullable().optional(),
    isHeadCoach: z.boolean().optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update"
});

export const getCoachQuerySchema = z.object({
    isHeadCoach: z.string().optional(),
    sort: z.enum(['id', 'name', 'email', 'level', 'createdAt', 'updatedAt']).optional(),
    order: z.enum(['asc', 'desc']).optional(),
});