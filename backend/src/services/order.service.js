const prisma = require("../lib/prisma");
const prices = require("../config/prices");

async function buyCrypto(userId, asset, amount) {
  const price = prices[asset];
  const totalCost = price * amount;

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

    if (Number(usdWallet.balance) < totalCost) {
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
          increment: amount,
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
  const price = prices[asset];
  const totalValue = price * amount;

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

    if (Number(cryptoWallet.balance) < amount) {
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
          decrement: amount,
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
