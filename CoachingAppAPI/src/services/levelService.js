import { LevelModel } from "../models/levelModel.js";
import CustomError from "../utils/CustomError.js";
import ERROR_MESSAGES from "../constants/errorMessages.js";

export const LevelService = {
    async getLevelRateById(level) {
        const rate = await LevelModel.getLevelRateById(level);
        if (!rate) {
            throw new CustomError(ERROR_MESSAGES.LEVEL_NOT_FOUND, 404);
        }
        return rate;
    }
}