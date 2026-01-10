import db from "../config/db.js";

export async function up() {
  try {
    await db.query(`
      ALTER TABLE coach
      ALTER COLUMN name DROP NOT NULL;
    `);
    console.log("✅ Coach table updated: 'name' column is now nullable");
  } catch (error) {
    console.error("❌ Error updating coach table:", error);
  }
}

up();
