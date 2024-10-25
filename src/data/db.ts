import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function query(text: string, params: any[]) {
    return await pool.query(text, params);
};

export default { query };
    