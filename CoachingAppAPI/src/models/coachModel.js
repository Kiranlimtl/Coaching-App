import db from '../config/db.js';

export const CoachModel = {
    async getCoaches(filters = {}) {
        const columnMap = {
            id: 'id',
            name: 'name',
            email: 'email',
            level: 'level',
            isHeadCoach: 'is_head_coach',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        };

        let query = 'SELECT * FROM coach';

        const values = [];
        const where = [];

        for (const key in filters) {
            if (key === 'sort' || key === 'order') continue;

            const column = columnMap[key];
            if (!column) continue;

            let value = filters[key]

            if (['name', 'email'].includes(key)) {
                value = `%${value}%`;
                where.push(`${column} ILIKE $${values.length + 1}`);
            } else if (key === 'isHeadCoach') {
                value = value === 'true';
                where.push(`${column} = $${values.length + 1}`);
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
    },

    async findById(id) {
        const result = await db.query(`SELECT * FROM coach WHERE id = $1`, [id]);
        return result.rows[0];
    },

    async findByFirebaseUID(firebase_uid) {
        const result = await db.query(`SELECT * FROM coach where firebase_uid = $1`, [firebase_uid])
        return result.rows[0]
    },

    async findByEmail(email) {
        const result = await db.query(`SELECT * FROM coach where email = $1`, [email])
        return result.rows[0]
    },

    async create({ email, firebase_uid }) {
        const result = await db.query(
            'INSERT INTO coach (email, firebase_uid) VALUES ($1, $2) RETURNING *',
            [email, firebase_uid]
        );
        return result.rows[0];
    },

    async update(coachId, updates) {
        const fields = Object.keys(updates)
        const setClauses = fields.map((key, index) => `${key} = $${index + 1}`)
        const values = Object.values(updates);
        values.push(coachId);

        const query = `
            UPDATE coach
            SET ${setClauses.join(', ')}
            WHERE id = $${values.length}
            RETURNING *;
        `;

        const result = await db.query(query, values);
        return result.rows[0];
    },

    async delete(coachId) {
        const result = await db.query('DELETE FROM coach WHERE id = $1 RETURNING *', [coachId]);
        return result.rowCount > 0;
    }
} 