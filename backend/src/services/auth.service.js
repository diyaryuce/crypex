const argon2 = require("argon2");
const prisma = require("../lib/prisma");

async function registerUser(email, password) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await argon2.hash(password);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });

  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
  };
}

module.exports = {
  registerUser,
};
