import db from '../config/db.js';

export async function up() {
    try {
        await db.query(`
            ALTER TABLE class_student
            DROP COLUMN IF EXISTS updated_at
            `);
            console.log(`Class Student table updated: dropped updated_at column`);
    } catch (error) {
        console.error(`Error updating class student table`, error)
    }
};

up();