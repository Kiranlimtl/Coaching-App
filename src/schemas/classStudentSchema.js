import { z } from 'zod';

export const classStudentSchema = z.object({
    classId: z.number().int().positive(),
    studentId: z.number().int().positive(),
    createdAt: z.string().datetime().optional()
});

export const createClassStudentSchema = classStudentSchema.omit({
    createdAt: true,
})

export const listClassStudentQuerySchema = z.object({
  classId: z.string().optional().transform((val) => val ? Number(val) : undefined)
    .refine((val) => val === undefined || Number.isInteger(val) && val > 0, {
      message: "classId must be a positive integer",
    }),

  studentId: z.string().optional().transform((val) => val ? Number(val) : undefined)
    .refine((val) => val === undefined || Number.isInteger(val) && val > 0, {
      message: "studentId must be a positive integer",
    }),

  sort: z.enum(['classId', 'studentId', 'createdAt']).optional(),
  order: z.enum(['asc', 'desc', 'ASC', 'DESC']).optional()
});