import { ZodError } from "zod";
import ERROR_MESSAGES  from "../constants/errorMessages.js";

export function validateData(schema) {
    return async(req, res, next) => {
        try {
            console.log('Validating data');
            await schema.parseAsync(req.body);
            console.log('Data validation successful');
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: `${issue.path.join(".")}: is ${issue.message}`,
                }));
                res.status(400).json({ error: ERROR_MESSAGES.INVALID_DATA, details: errorMessages });
            } else {
                console.log('Unexpected error during validation:', error);
                res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
            }
        }
    }
}

export function validateQuery(schema) {
    return async (req, res, next) => {
        try {
            console.log('Validating query params');
            req.validateQuery = validateQuery;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: `${issue.path.join(".")}: ${issue.message}`,
                }));
                res.status(400).json({ error: ERROR_MESSAGES.INVALID_DATA, details: errorMessages});
            } else {
                console.log('Unexpected error during query validation:', error);
                res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR})
            }
        }
    }
}