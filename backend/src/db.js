const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function initDb() {
  await pool.query(`
    DO $$ BEGIN
        CREATE TYPE doc_type AS ENUM ('cpf', 'cnpj');
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
        CREATE TYPE message_type AS ENUM ('system', 'text');
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END $$;

    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        document TEXT NOT NULL,
        document_type doc_type NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE (document, document_type)
    );

    CREATE TABLE IF NOT EXISTS conversation (
        id SERIAL PRIMARY KEY,
        last_message TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS conversation_user (
        id SERIAL PRIMARY KEY,
        conversation_id INTEGER REFERENCES conversation(id) NOT NULL,
        user_id INTEGER NOT NULL,
        reciever_user_id INTEGER NOT NULL,

        CONSTRAINT fk_user_id
            FOREIGN KEY (user_id)
            REFERENCES users(id),

        CONSTRAINT fk_reciever_user_id
            FOREIGN KEY (reciever_user_id)
            REFERENCES users(id)

    );

    CREATE TABLE IF NOT EXISTS message (
        id SERIAL PRIMARY KEY,
        conversation_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        type message_type NOT NULL,
        text TEXT,

        CONSTRAINT fk_conversation_id
            FOREIGN KEY (conversation_id)
            REFERENCES conversation(id),

        CONSTRAINT fk_user_id
            FOREIGN KEY (user_id)
            REFERENCES users(id)
    );
  `);
}

async function withTransaction(callback) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { pool, initDb, withTransaction };