const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  try {
    const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Not authenticated" });
  }
}

module.exports = { requireAuth };