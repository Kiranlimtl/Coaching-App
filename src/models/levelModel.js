import db from '../config/db.js';

export const LevelModel = {
    async getLevelRateById(level) {
        const result = await db.query(`SELECT rate_per_hour FROM coach_level WHERE level = $1`, [level]);
        return result.rows[0] ? result.rows[0].id : null;
    }
}