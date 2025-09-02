import db from '../config/db.js';

export const CoachPaymentModel = {
    async listCoachPayments(filters = {}) {
        const columnMap = {
            id: 'id',
            coachId: 'coach_id',
            classId: 'class_id',
            isPaid: 'is_paid',
            paymentDate: 'payment_date',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        };

        let query = `SELECT * FROM coach_payment`;

        const values = [];
        const where = [];

        for (const key in filters) {
            if (key === 'sort' || key === 'order') continue;

            const column = columnMap[key];
            if (!column) continue;

            let value = filters[key];

            if (['coachId', 'classId'].includes(key)) {
                value = parseInt(value, 10);
                where.push(`${column} = $${values.length + 1}`);
            } else if (['isPaid'].includes(key)) {
                value = value ? true : false;
                where.push(`${column} = $${values.length + 1}`);
            } else if (['paymentDate'].includes(key)) {
                where.push(`${column}::date = $${values.length + 1}`);
            } else {
                where.push(`${column} ILIKE $${values.length + 1}`);
                value = `%${value}%`;
            }

            values.push(value);
        }

        const sortColumn = columnMap[filters.sort] || 'created_at';
        const sortOrder = filters.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        if (where.length > 0) {
            query += ` WHERE ` + where.join(' AND ');
        }

        query += ` ORDER BY ${sortColumn} ${sortOrder}`;

        const { rows } = await db.query(query, values);
        return rows;
    },

    async findById(id) {
        const result = await db.query(`SELECT * FROM coach_payment WHERE id = $1`, [id]);
        return result.rows[0];
    },

    async create({ coachId, rateTierId, levelId, classId, numStudents, classDuration, finalRate, totalAmount, isPaid, paymentDate }) {
        const result = await db.query(
            `INSERT INTO coach_payment (coach_id, rate_tier_id, level_id, class_id, num_students, class_duration, final_rate, total_amount, is_paid, payment_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            [coachId, rateTierId, levelId, classId, numStudents, classDuration, finalRate, totalAmount, isPaid, paymentDate]
        );
        return result.rows[0];
    },


    async update(id, updates) {
        const fields = Object.keys(updates);
        const setClauses = fields.map((key, index) => `${key} =  $${index + 1}`);
        const values = Object.values(updates);
        values.push(id);

        const query = `
            UPDATE coach_payment
            SET ${setClauses.join(', ')}
            WHERE id = $${values.length}
            RETURNING *;
        `;
        console.log(query, values)
        const result = await db.query(query, values);
        return result.rows[0];
    },

    async delete(id) {
        const result = await db.query(`DELETE FROM coach_payment WHERE id = $1 RETURNING *`, [id]);
        return result.rowCount > 0;
    }
};