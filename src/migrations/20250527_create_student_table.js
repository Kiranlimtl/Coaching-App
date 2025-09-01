import db from '../config/db.js';

export async function up() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS student (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Student table created successfully.');
    } catch (error) {
        console.error('Error creating student table:', error);
    }
}

export async function down() {
    try { 
        await db.query(`
            DROP TABLE IF EXISTS student;
        `);
    } catch (error) {
        console.error('Error dropping student table:', error);
    }
}

up()