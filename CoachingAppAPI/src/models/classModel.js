import db from '../config/db.js';

export const ClassModel = {
    async getClasses(filters = {}) {
        const columnMap = {
            id: 'id',
            name: 'name',
            originalCoachId: 'original_coach_id',
            currentCoachId: 'current_coach_id',
            startTime: 'start_time',
            endTime: 'end_time',
            duration: 'duration',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }

        let query = `SELECT * FROM class`;

        const values = [];
        const where = [];

        for (const key in filters) {
            if (key ===  'sort' || key === 'order') continue; 
            
            const column = columnMap[key];
            if(!column) continue;

            let value = filters[key];

            if(['name'].includes(key)) {
                value = `%${value}%`
                where.push(`${column} ILIKE $${values.length + 1}`);
            } else {
                where.push(`${column} = $${values.length + 1}`);
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
        const result = await db.query(`SELECT * FROM class WHERE id = $1`, [id]);
        return result.rows[0];
    },

    async create({ name, original_coach_id, current_coach_id, start_time, end_time, duration }) {
        const result = await db.query(
            `INSERT INTO class (name, original_coach_id, current_coach_id, start_time, end_time, duration) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, original_coach_id, current_coach_id, start_time, end_time, duration]
        );

        return result.rows[0];
    },

    async update(id, updates) {
        const fields = Object.keys(updates);
        const setClauses = fields.map((key, index) => `${key} =  $${index + 1}`);
        const values = Object.values(updates);
        values.push(id);

        const query = `
            UPDATE class
            SET ${setClauses.join(', ')}
            WHERE id = $${values.length}
            RETURNING *;
        `;
        console.log(query, values)
        const result = await db.query(query, values);
        return result.rows[0];
    },

    async delete(id) {
        const result = await db.query(`DELETE FROM class WHERE id = $1 RETURNING *`, [id]);
        return result.rowCount > 0;
    },

    async getClassAsListItemPerCoach(coachId) {
        const query = `
            SELECT 
                c.id,
                c.name,
                c.start_time AS "startTime",
                c.end_time AS "endTime",
                c.duration,
                co.name AS "currentCoachName", 

                CASE 
                    WHEN c.end_time < NOW() THEN TRUE
                    ELSE FALSE
                END AS "isClassOver"
                
            FROM 
                class c
            LEFT JOIN
                coach co ON c.current_coach_id = co.id
                
            -- 💡 NEW: Filtering Clause
            WHERE 
                c.original_coach_id = $1
                OR c.current_coach_id = $1
                
            ORDER BY
                "isClassOver" ASC, 
                c.start_time ASC;
            `;
    
        // Execute the query, passing the coachId as the parameter for $1
        const result = await db.query(query, [coachId]); 
        
        return result.rows;
    }
}