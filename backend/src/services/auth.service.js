const argon2 = require("argon2");
const prisma = require("../lib/prisma");
const jwt = require("jsonwebtoken");

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

      wallets: {
        create: [
          {
            asset: "USD",
            balance: 10000,
          },
          {
            asset: "BTC",
            balance: 0,
          },
          {
            asset: "ETH",
            balance: 0,
          },
        ],
      },
    },
  });

  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
  };
}

async function loginUser(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatches = await argon2.verify(user.passwordHash, password);

  if (!passwordMatches) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
}

module.exports = {
  registerUser,
  loginUser,
};
