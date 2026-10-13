const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { pool, initDb } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend" });
});

app.post("/api/login", async (req, res) => {
  try {
    const { document, document_type, password } = req.body;

    if (!document || !document_type || !password) {
      return res.status(400).json({ error: "document, document_type and password are required" });
    }

    const cleanDocument = String(document).replace(/\D/g, "");

    const { rows } = await pool.query(
      "SELECT id, password_hash, document, document_type, created_at FROM users WHERE document_type = $1 AND document = $2",
      [document_type, document]
    );

    const user = rows[0];
    const valid = user && (await bcrypt.compare(password, user.password_hash));

    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    delete user.password_hash;
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ ok: true });
  } catch (err) {
    if (err.code === "22P02") return res.status(400).json({ error: "Invalid document type" });
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/user", async (req, res) => {
  const { document, document_type, password } = req.body;

  if (!document || !document_type || !password) {
    return res.status(400).json({ error: "document, document_type and password are required" });
  }

  const cleanDocument = String(document).replace(/\D/g, "");
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const { rows } = await pool.query(
      `INSERT INTO users (document, document_type, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, document, document_type`,
      [cleanDocument, document_type, passwordHash]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === "23505") return res.status(409).json({ error: "This document already exists" });
    if (err.code === "22P02") return res.status(400).json({ error: "document_type must be 'cpf' or 'cnpj'" });
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/me", (req, res) => {
  try {
    const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    res.json(payload);
  } catch {
    res.status(401).json({ error: "Not authenticated" });
  }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ ok: true });
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database init failed:", err);
    process.exit(1);
  });
