import db from '../config/db.js';

export async function up() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS coach_level (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            rate_per_hour DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Coach level table created successfully.');
    } catch (error) {
        console.error('Error creating coach level table:', error);
    }
}

export async function down() {
    try {
        await db.query(`
            DROP TABLE IF EXISTS coach_level;
        `);
        console.log('Coach level table dropped successfully.');
    } catch (error) {
        console.error('Error dropping coach level table:', error);
    }
}

up()