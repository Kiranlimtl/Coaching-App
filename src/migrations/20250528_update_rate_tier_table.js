// 20250528_update_rate_tier_table.js
import db from '../config/db.js';

export async function up() {
  try {
    await db.query(`
      ALTER TABLE rate_tier
      ADD COLUMN min_students INT NOT NULL DEFAULT 1,
      ADD COLUMN max_students INT;
    `);
    console.log('rate_tier table updated successfully.');
  } catch (error) {
    console.error('Error updating rate_tier table:', error);
  }
}

up()