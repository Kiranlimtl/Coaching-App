import { RateTierModel } from "../models/rateTierModel.js";
import CustomError from "../utils/CustomError.js";
import ERROR_MESSAGES from "../constants/errorMessages.js";

export const RateTierService = {
    
    async getRateTierIdByNumStudents(numStudents) {
        const rateTierId = await RateTierModel.getRateTierIdByNumStudents(numStudents);
        if (!rateTierId) {
            throw new CustomError(ERROR_MESSAGES.RATE_TIER_NOT_FOUND, 404);
        }
        return rateTierId;
    },

    async getRateById(rateTierId) {
        const rateTier = await RateTierModel.getRateTierById(rateTierId);
        if (!rateTier) {
            throw new CustomError(ERROR_MESSAGES.RATE_TIER_NOT_FOUND, 404);
        }
        return rateTier;
    }
}