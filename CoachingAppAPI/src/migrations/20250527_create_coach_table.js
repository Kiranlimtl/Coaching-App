import db from '../config/db.js';

export async function up() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS coach (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone VARCHAR(20),
            firebase_uid VARCHAR(255) UNIQUE NOT NULL,
            level INT REFERENCES coach_level(id),
            is_head_coach BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Coach table created successfully.');
    } catch (error) {
        console.error('Error creating coach table:', error);
    }
}

export async function down() {
    try {
        await db.query(`
            DROP TABLE IF EXISTS coach;
        `);
        console.log('Coach table dropped successfully.');
    } catch (error) {
        console.error('Error dropping coach table:', error);
    }
}


up()



