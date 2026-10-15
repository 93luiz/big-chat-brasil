const express = require("express");
const bcrypt = require("bcryptjs");
const repository = require("../repositories/user");
const { pool } = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.use(requireAuth);

router.post("/", async (req, res) => {
  const { document, document_type, password } = req.body;

  if (!document || !document_type || !password) {
    return res.status(400).json({ error: "document, document_type and password are required" });
  }

  const cleanDocument = String(document).replace(/\D/g, "");
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await repository.create({
      document: cleanDocument,
      documentType: document_type,
      passwordHash: passwordHash,
    });
    res.status(201).json(user);
  } catch (err) {
    if (err.code === "23505") return res.status(409).json({ error: "This document already exists" });
    if (err.code === "22P02") return res.status(400).json({ error: "document_type must be 'cpf' or 'cnpj'" });
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;