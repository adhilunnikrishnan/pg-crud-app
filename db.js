import pg from 'pg';
const { Pool } = pg;

// Configure this with your actual Postgres connection details or DATABASE_URL env var
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text, params) => pool.query(text, params);
export default pool;

