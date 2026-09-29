const { Prisma } = require("@prisma/client");
const prisma = require("../lib/prisma");
const prices = require("../config/prices");

async function buyCrypto(userId, asset, amount) {
  const price = new Prisma.Decimal(prices[asset]);
  const amountDecimal = new Prisma.Decimal(amount);
  const totalCost = price.mul(amountDecimal);

  const result = await prisma.$transaction(async (tx) => {
    const usdWallet = await tx.wallet.findUnique({
      where: {
        userId_asset: {
          userId,
          asset: "USD",
        },
      },
    });

    if (!usdWallet) {
      throw new Error("USD wallet not found");
    }

    if (usdWallet.balance.lt(totalCost)) {
      throw new Error("Insufficient USD balance");
    }

    const updatedUsd = await tx.wallet.update({
      where: {
        userId_asset: {
          userId,
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
          userId,
          asset,
        },
      },
      data: {
        balance: {
          increment: amountDecimal,
        },
      },
    });

    const transaction = await tx.transaction.create({
      data: {
        userId,
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

  return result;
}

async function sellCrypto(userId, asset, amount) {
  const price = new Prisma.Decimal(prices[asset]);
  const amountDecimal = new Prisma.Decimal(amount);
  const totalValue = price.mul(amountDecimal);

  const result = await prisma.$transaction(async (tx) => {
    const cryptoWallet = await tx.wallet.findUnique({
      where: {
        userId_asset: {
          userId,
          asset,
        },
      },
    });

    if (!cryptoWallet) {
      throw new Error("Crypto wallet not found");
    }

    if (cryptoWallet.balance.lt(amountDecimal)) {
      throw new Error("Insufficient crypto balance");
    }

    const updatedCrypto = await tx.wallet.update({
      where: {
        userId_asset: {
          userId,
          asset,
        },
      },
      data: {
        balance: {
          decrement: amountDecimal,
        },
      },
    });

    const updatedUsd = await tx.wallet.update({
      where: {
        userId_asset: {
          userId,
          asset: "USD",
        },
      },
      data: {
        balance: {
          increment: totalValue,
        },
      },
    });

    const transaction = await tx.transaction.create({
      data: {
        userId,
        type: "SELL",
        asset,
        amount,
      },
    });

    return {
      price,
      totalValue,
      usdWallet: updatedUsd,
      cryptoWallet: updatedCrypto,
      transaction,
    };
  });

  return result;
}

module.exports = {
  buyCrypto,
  sellCrypto,
};
