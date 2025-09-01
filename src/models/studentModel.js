import db from '../config/db.js';

export const StudentModel = {
    async findById(id) {
        const result = await db.query(`SELECT * FROM student WHERE id = $1`, [id]);
        return result.rows[0];
    },

    async create({ name, phone}) {
        const result = await db.query(
            `INSERT INTO student (name, phone) VALUES ($1, $2) RETURNING *`,
            [name, phone]
        );
        return result.rows[0];
    },

    async update(id, updates) {
        const fields = Object.keys(updates);
        const setClauses = fields.map((key, index) => `${key} = $${index + 1}`);
        const values = Object.values(updates);
        values.push(id);

        const query = `
            UPDATE student
            SET ${setClauses.join(', ')}
            WHERE id = $${values.length}
            RETURNING *;
        `;

        const result = await db.query(query, values);
        return result.rows[0];
    },

    async delete(id) {
        const result = await db.query('DELETE from student WHERE id = $1 RETURNING *', [id])
        return result.rowCount > 0;
    },

    async getStudents(filters = {}) {
        const columnMap = {
            name: 'name',
            phone: 'phone',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        };

        let query = 'SELECT * FROM student';

        const values = [];
        const where = [];

        for (const key in filters) {
            if (key == 'sort' || key === 'order') continue;

            const column = columnMap[key];
            if (!column) continue;

            let value = filters[key]

            if (['name'].includes(key)) {
                value = `%${value}%`;
                where.push(`${column} ILIKE $${values.length + 1}`);
            } else {
                where.push(`${column} = $${values.length + 1}`);
            }

            values.push(value);
        }
        
        const sortColumn = columnMap[filters.sort] || 'created_at';
        const sortOrder = filters.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        if (where.length > 0) {
            query +=  ' WHERE ' + where.join(' AND ');
        }
        query += ` ORDER BY ${sortColumn} ${sortOrder}`;

        const { rows } = await db.query(query, values);
        return rows;
    }
}