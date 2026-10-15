const { pool } = require("../db");

async function findByDocument(document, documentType) {
  const { rows } = await pool.query(
    "SELECT id, document, document_type FROM users WHERE document = $1 AND document_type = $2",
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

async function create({ document, documentType, passwordHash }) {
  const { rows } = await pool.query(
    `INSERT INTO users (document, document_type, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, document, document_type`,
    [document, documentType, passwordHash]
  );
  return rows[0];
}