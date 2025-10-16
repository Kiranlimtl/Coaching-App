import db from '../config/db.js'

export async function up() {
    try{
        await db.query(`
            ALTER TABLE coach_level DROP CONSTRAINT IF EXISTS unique_name;
            ALTER TABLE coach_level ADD CONSTRAINT unique_coach_level_name UNIQUE (name);
        `);
    console.log('updated coach_level name to be unique')
    } catch (error) {
        console.log('Error updating coach_level name', error)
    }
}

up()