import { RateTierModel } from "../models/rateTierModel.js";
import CustomError from "../utils/CustomError.js";
import ERROR_MESSAGES from "../constants/errorMessages.js";

export const RateTierService = {
    async getRateTier(numStudents) {
        const rateTier = await RateTierModel.getRateTierByNumStudents(numStudents);
        if (!rateTier) {
            throw new CustomError(ERROR_MESSAGES.RATE_TIER_NOT_FOUND, 404);
        }
        return rateTier;
    },

    async getRateTierIdByNumStudents(numStudents) {
        const rateTierId = await RateTierModel.getRateTierIdByNumStudents(numStudents);
        if (!rateTierId) {
            throw new CustomError(ERROR_MESSAGES.RATE_TIER_NOT_FOUND, 404);
        }
        return rateTierId;
    }
}