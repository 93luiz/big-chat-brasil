const app = require('./src/app');

const PORT = process.env.PORT || 3000;

async function start() {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

start().catch((err) => {
  console.error("Startup failed:", err);
  process.exit(1);
});
