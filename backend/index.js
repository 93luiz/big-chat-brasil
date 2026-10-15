const app = require('./src/app');
const { initDb } = require("./src/db");

const PORT = process.env.PORT || 3000;

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
