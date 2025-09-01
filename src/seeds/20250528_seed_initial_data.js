import db from '../config/db.js'

export async function up() {
    try {
        await db.query(`
            INSERT INTO coach_level (name, rate_per_hour)
            VALUES
                ('Level 0', 30.00),
                ('Level 1', 45.00),
                ('Level 2', 60.00),
                ('Level 3', 75.00),
                ('Level 4', 90.00),
                ('Level 5', 105.00)
            ON CONFLICT (name) DO NOTHING;
        `);

        console.log('coach_level table populated')


        await db.query(`
            INSERT INTO rate_tier (name, rate_per_hour, min_students, max_students)
            VALUES
                ('1-2 students', 1.0, 1, 2),
                ('3-5 students', 1.2, 3, 5),
                ('5+ students', 1.5, 5, NULL)
            ON CONFLICT (name) DO NOTHING;
        `);

        console.log('rate_tier table populated')
    } catch (error) {
        console.error('Error inserting seed data:', error)
    }
}

up()