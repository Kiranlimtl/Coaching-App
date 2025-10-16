import db from '../config/db.js';

export async function up() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS coach_payment (
                id SERIAL PRIMARY KEY,

                coach_id INT REFERENCES coach(id),
                rate_tier_id INT REFERENCES rate_tier(id),
                level_id INT REFERENCES coach_level(id),
                class_id INT REFERENCES class(id),


                num_students INT NOT NULL,
                class_duration INTERVAL NOT NULL,
                level DECIMAL(10,2),        
                rate_tier DECIMAL(10,2),  
                final_rate DECIMAL(10,2), 
                total_amount DECIMAL(10,2),

                is_paid BOOLEAN DEFAULT FALSE,
                payment_date TIMESTAMP,
                
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('coach payment table created successfully.');
    } catch (error) {
        console.error('Error creating coach payment table:', error);
    }
}

export async function down() {
    try {
        await db.query(`
            DROP TABLE IF EXISTS coach_payment;
        `);
        console.log('coach payment table dropped successfully.');
    } catch (error) {
        console.error('Error dropping coach payment table:', error);
    }
}

up();