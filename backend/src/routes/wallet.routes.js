const express = require("express");
const { requireAuth } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");
const { depositSchema } = require("../schemas/wallet.schema");
const prisma = require("../lib/prisma");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const wallets = await prisma.wallet.findMany({
    where: {
      userId: req.userId,
    },
    select: {
      id: true,
      asset: true,
      balance: true,
    },
  });

  res.json(wallets);
});

router.post(
  "/deposit",
  requireAuth,
  validate(depositSchema),
  async (req, res) => {
    const { asset, amount } = req.body;

    const wallet = await prisma.wallet.update({
      where: {
        userId_asset: {
          userId: req.userId,
          asset,
        },
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    res.json(wallet);
  },
);

module.exports = router;
