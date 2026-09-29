const express = require("express");
const { requireAuth } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");
const { orderSchema } = require("../schemas/order.schema");
const prisma = require("../lib/prisma");
const prices = require("../config/prices");

const router = express.Router();

router.post("/buy", requireAuth, validate(orderSchema), async (req, res) => {
  const { asset, amount } = req.body;

  const price = prices[asset];
  const totalCost = price * amount;

  const result = await prisma.$transaction(async (tx) => {
    const usdWallet = await tx.wallet.findUnique({
      where: {
        userId_asset: {
          userId: req.userId,
          asset: "USD",
        },
      },
    });

    if (!usdWallet) {
      throw new Error("USD wallet not found");
    }

    if (Number(usdWallet.balance) < totalCost) {
      throw new Error("Insufficient USD balance");
    }

    const updatedUsd = await tx.wallet.update({
      where: {
        userId_asset: {
          userId: req.userId,
          asset: "USD",
        },
      },
      data: {
        balance: {
          decrement: totalCost,
        },
      },
    });

    const updatedCrypto = await tx.wallet.update({
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
        type: "BUY",
        asset,
        amount,
      },
    });

    return {
      price,
      totalCost,
      usdWallet: updatedUsd,
      cryptoWallet: updatedCrypto,
      transaction,
    };
  });

  res.json(result);
});

module.exports = router;
