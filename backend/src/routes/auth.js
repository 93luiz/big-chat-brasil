const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const repository = require("../repositories/user");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { document, document_type, password } = req.body;

    if (!document || !document_type || !password) {
      return res.status(400).json({ error: "document, document_type and password are required" });
    }

    const cleanDocument = String(document).replace(/\D/g, "");

    const user = await repository.findCredentials(cleanDocument, document_type);

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

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ ok: true });
});

router.get("/me", requireAuth, (req, res) => {
  res.json(req.user);
});

module.exports = router;