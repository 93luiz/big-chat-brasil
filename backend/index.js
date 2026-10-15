const { seedUsers } = require('./seed');
const app = require('./src/app');
const { initDb } = require("./src/db");

const PORT = process.env.PORT || 3000;

async function start() {
  await initDb();

  await seedUsers();

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

start().catch((err) => {
  console.error("Startup failed:", err);
  process.exit(1);
});
