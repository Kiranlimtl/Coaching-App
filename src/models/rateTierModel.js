import db from '../config/db.js';

export const RateTierModel = {
    async getRateTierByNumStudents(numStudents) {
        const query = `
            SELECT * 
            FROM rate_tier
            WHERE ($1 BETWEEN min_students AND max_students)
                OR (max_students IS NULL AND $1 >= min_students)
            LIMIT 1
        `;
        const { rows } = await db.query(query, [numStudents]);
        return rows[0];
    },

    async getRateTierIdByNumStudents(numStudents) {
        const query = `
            SELECT id 
            FROM rate_tier
            WHERE ($1 BETWEEN min_students AND max_students)
                OR (max_students IS NULL AND $1 >= min_students)
            LIMIT 1
        `;
        const { rows } = await db.query(query, [numStudents]);
        return rows[0] ? rows[0].id : null;
    }
}