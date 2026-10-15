const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/user");
const conversationRoutes = require("./routes/conversation");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/conversation", conversationRoutes);

module.exports = app;