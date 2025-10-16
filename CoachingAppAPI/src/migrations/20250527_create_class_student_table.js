import db from '../config/db.js';

export async function up() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS class_student (
                class_id INT REFERENCES class(id) ON DELETE CASCADE,
                student_id INT REFERENCES student(id) ON DELETE CASCADE,
                PRIMARY KEY (class_id, student_id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await db.query(`
            CREATE INDEX IF NOT EXISTS idx_class_student_student_id
            ON class_student(student_id);
        `);

        console.log('Class Student table created successfully.');
    } catch (error) {
        console.error('Error creating class student table:', error);
    }
}

export async function down() {
    try {
        await db.query(`
            DROP TABLE IF EXISTS class_student;
        `);
        console.log('Class Student table dropped successfully.');
    } catch (error) {
        console.error('Error dropping class student table:', error);
    }
}

up()