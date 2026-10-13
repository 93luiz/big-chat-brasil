const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function initDb() {
  await pool.query(`
    DO $$ BEGIN
      CREATE TYPE doc_type AS ENUM ('cpf', 'cnpj');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      document TEXT NOT NULL,
      document_type doc_type NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (document, document_type)
    );
  `);
}


module.exports = { pool, initDb };