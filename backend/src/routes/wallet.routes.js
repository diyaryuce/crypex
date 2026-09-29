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

    const result = await prisma.$transaction(async (tx) => {
      const wallet = await tx.wallet.update({
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

      const transaction = await tx.transaction.create({
        data: {
          userId: req.userId,
          type: "DEPOSIT",
          asset,
          amount,
        },
      });

      return {
        wallet,
        transaction,
      };
    });

    res.json(result);
  },
);

module.exports = router;
