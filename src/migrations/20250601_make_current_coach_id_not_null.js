import db from '../config/db.js';

export async function up() {
    try {
        await db.query(`
            ALTER TABLE class
            ALTER COLUMN current_coach_id SET NOT NULL;
            `);
        console.log(`class table updated: current_coach_id is now not NULL`);
    } catch (error) {
        console.error(`Error updating class table: `, error);
    }
};

up();