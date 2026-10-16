const bcrypt = require("bcryptjs");
const user = require("./src/repositories/user");

const SEED_USERS = [
  { name: "Fulano", document: "12345678909", documentType: "cpf", password: "123123" },
  { name: "Ciclano", document: "11222333000181", documentType: "cnpj", password: "123123" },
];

async function seedUsers() {
  for (const u of SEED_USERS) {
    await user.createIfMissing({
      name: u.name,
      document: u.document,
      documentType: u.documentType,
      passwordHash: await bcrypt.hash(u.password, 10),
    });
  }
  console.log(`Seeded ${SEED_USERS.length} dev users`);
}

module.exports = { seedUsers };