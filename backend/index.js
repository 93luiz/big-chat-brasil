const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
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

app.post("/api/login", (req, res) => {
  // ...verify the user's credentials first
  const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ ok: true });
});

app.get("/api/me", (req, res) => {
  try {
    const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    res.json({ userId: payload.userId });
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
