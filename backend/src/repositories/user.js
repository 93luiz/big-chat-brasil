const { pool } = require("../db");

async function find(id) {
  const { rows } = await pool.query(
    "SELECT id, name, document, document_type FROM users WHERE id = $1",
    [id]
  );
  return rows[0] || null;
}

async function findByDocument(document, documentType) {
  const { rows } = await pool.query(
    "SELECT id, name, document, document_type FROM users WHERE document = $1 AND document_type = $2",
    [document, documentType]
  );
  return rows[0] || null;
}

// Para fins de login
async function findCredentials(document, documentType) {
  const { rows } = await pool.query(
    "SELECT id, password_hash FROM users WHERE document = $1 AND document_type = $2",
    [document, documentType]
  );
  return rows[0] || null;
}

async function create({ name, document, documentType, passwordHash }) {
  const { rows } = await pool.query(
    `INSERT INTO users (name, document, document_type, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, document, document_type`,
    [name, document, documentType, passwordHash]
  );
  return rows[0];
}

async function createIfMissing({ name, document, documentType, passwordHash }) {
  await pool.query(
    `INSERT INTO users (name, document, document_type, password_hash)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (document, document_type) DO NOTHING`,
    [name, document, documentType, passwordHash]
  );
}

module.exports = { find, findByDocument, findCredentials, create, createIfMissing };