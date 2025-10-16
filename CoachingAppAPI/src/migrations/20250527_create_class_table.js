import db from '../config/db.js';

export async function up() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS class (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                original_coach_id INT REFERENCES coach(id) NOT NULL,
                current_coach_id INT REFERENCES coach(id),
                start_time TIMESTAMP NOT NULL,
                end_time TIMESTAMP NOT NULL,
                duration INTERVAL NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Class table created successfully.');
    } catch (error) {
        console.error('Error creating class table:', error);
    }   
}

async function down() {
    try {
        await db.query(`
            DROP TABLE IF EXISTS class;
        `);
        console.log('Class table dropped successfully.');
    } catch (error) {
        console.error('Error dropping class table:', error);
    }
}   

up();