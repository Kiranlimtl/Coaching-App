import { z } from 'zod';

export const studentSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Name should be longer").max(255),
    phone: z.string().max(20).optional(),

    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional()
});

export const createStudentSchema = studentSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
});

export const updateStudentSchema = z.object({
    name: z.string().min(1, "Name should be longer").max(255).optional(),
    phone: z.string().max(20).optional()
}).refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided"
});

export const getStudentQuerySchema = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    sort: z.enum(['name', 'phone', 'createdAt', 'updatedAt']).optional(),
    order: z.enum(['asc', 'desc']).optional(),
})