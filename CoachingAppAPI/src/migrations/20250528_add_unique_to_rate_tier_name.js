import db from '../config/db.js'

export async function up() {
    try{
        await db.query(`
            ALTER TABLE coach_level DROP CONSTRAINT IF EXISTS unique_name;
            ALTER TABLE rate_tier ADD CONSTRAINT unique_rate_tier_name UNIQUE (name);
        `);
    console.log('updated rate_tier name to be unique')
    } catch (error) {
        console.log('Error updating rate_tier name', error)
    }
}

up()
