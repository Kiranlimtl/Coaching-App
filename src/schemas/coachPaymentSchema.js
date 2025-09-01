import { z } from 'zod';

export const coachPayment = z.object({
    id: z.number(),
    coachId: z.number(),
    rateTierId: z.number(),
    levelId: z.number(),
    classId: z.number(),
    numStudents: z.number().int().min(1, "Number of students must be at least 1"),
    classDuration: z.string().regex(/^\d+\s+minutes$/, {
        message: "Duration must be in format like '90 minutes'"
    }),
    level: z.number().nonnegative(),
    rateTier: z.number().nonnegative(),
    finalRate: z.number().nonnegative(),
    totalAmount: z.number().nonnegative(),

    isPaid: z.boolean().default(false),

    paymentDate: z.string().datetime().optional(),

    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

export const createCoachPayment = coachPayment.omit({
    id: true,
    levelId: true,
    rateTierId: true,
    numStudents: true,
    level: true,
    rateTier: true,
    finalRate: true,
    totalAmount: true,
    isPaid: true,
    paymentDate: true,
    createdAt: true,
    updatedAt: true,
    
});

export const updateCoachPayment = coachPayment
    .omit({ 
        id: true,
        rateTierId: true,
        levelId: true,
        numStudents: true,
        level: true,
        rateTier: true,
        finalRate: true,
        totalAmount: true,
        createdAt: true,
        updatedAt: true,
     })
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field must be provided for update',
    });

export const getCoachPaymentQuery = z.object({
    coachId: z.string().optional(),  // still comes as string in URL
    classId: z.string().optional(),
    isPaid: z.boolean().optional(),
    paymentDate: z.string().datetime().optional(),

    sort: z.enum([
        'id',
        'coachId',
        'classId',
        'isPaid',
        'paymentDate',
        'createdAt',
        'updatedAt'
    ]).default('createdAt'),
    
    order: z.enum(['asc', 'desc']).default('desc'),
});

