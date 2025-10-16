import db from '../config/db.js';

export async function up() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS rate_tier (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                rate_per_hour DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Rate tier table created successfully.');
    } catch (error) {
        console.error('Error creating rate tier table:', error);
    }
}



export async function down() {
    try {
        await db.query(`
            DROP TABLE IF EXISTS rate_tier;
        `);
        console.log('Rate tier table dropped successfully.');
    } catch (error) {
        console.error('Error dropping rate tier table:', error);
    }
}

up()