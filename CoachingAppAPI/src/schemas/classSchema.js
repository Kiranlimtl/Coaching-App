import { z } from 'zod';

export const classSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Name should be longer").max(255),
    originalCoachId: z.number().int(),
    currentCoachId: z.number().int(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    duration: z.string().regex(/^\d+\s+minutes$/, {
        message: "Duration must be in format like '90 minutes'"
    }),

    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional()
});

export const createClassSchema = classSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
}).extend({
    currentCoachId: z.number().int().optional(),
    duration: z.string().optional(),
}).refine((data) => {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    return end > start;
}, {
    message: "end time must be after start time",
    path: ['endTime']
});

const baseUpdatableClassSchema = classSchema
  .omit({ id: true, createdAt: true, updatedAt: true, originalCoachId: true })
  .extend({
    currentCoachId: z.number().int().optional(),
    duration: z.string().optional(),
});

export const updateClassSchema = baseUpdatableClassSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
});

export const getClassQuerySchema = z.object({
    name: z.string().optional(),
    originalCoachId: z.string().optional(),  // still comes as string in URL
    currentCoachId: z.string().optional(),
    startTime: z.string().optional(),  // could later support range
    endTime: z.string().optional(),
    duration: z.string().optional(),   // e.g., '90 minutes'

    sort: z.enum([
        'id',
        'name',
        'originalCoachId',
        'currentCoachId',
        'startTime',
        'endTime',
        'duration',
        'createdAt',
        'updatedAt',
    ]).optional(),

    order: z.enum(['asc', 'desc']).optional(),
});

export const idParamSchema = z.object({
    id: z.string().refine((val) => !isNaN(Number(val)), {
        message: "ID must be a valid number"
    }).transform(Number)
});