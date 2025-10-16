import db from '../config/db.js';

export const ClassStudentModel = {
    async listClassStudents(filters = {}) {
        const columnMap = {
            classId: 'class_id',
            studentId: 'student_id',
        }

        let query = `SELECT * from class_student`;

        const values = [];
        const where = [];

        for (const key in filters) {
            if (key === 'sort' || key === 'order') continue;
            const column = columnMap[key];
            if (!column) continue;
            let value = filters[key];
            where.push(`${column} = $${values.length + 1}`);
            values.push (value);
        }

        const sortColumn = columnMap[filters.sort] || 'created_at';
        const sortOrder = filters.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        if (where.length > 0) {
            query += ` WHERE ` + where.join(` AND `);
        }

        query += ` ORDER BY ${sortColumn} ${sortOrder}`;

        const { rows } = await db.query(query, values);
        return rows;
    },

    async findByBoth(class_id, student_id) {
        const result = await db.query(`SELECT * FROM class_student WHERE class_id = $1 AND student_id = $2`, [class_id, student_id]);
        return result.rows[0];
    },

    async create({ class_id, student_id }) {
        const result = await db.query(
            `INSERT INTO class_student 
            (class_id, student_id) VALUES ($1, $2) 
            RETURNING *`,
            [class_id, student_id]
        );

        return result.rows[0];
    },

    async remove(class_id, student_id) {
        const result = await db.query(
            `DELETE FROM class_student
            WHERE class_id = $1 AND student_id = $2
            RETURNING *`,
            [class_id, student_id]
        );

        return result.rows[0];
    }


}