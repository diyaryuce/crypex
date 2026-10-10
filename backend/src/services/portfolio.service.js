const prisma = require("../lib/prisma");
const { getMarketHistory } = require("./market.services");

async function getPortfolioHistory(userId, range) {
  const [wallets, transactions, btcHistory, ethHistory] = await Promise.all([
    prisma.wallet.findMany({
      where: {
        userId,
      },
    }),

    prisma.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    getMarketHistory("BTC", range),
    getMarketHistory("ETH", range),
  ]);

  const balances = {
    USD: Number(wallets.find((wallet) => wallet.asset === "USD")?.balance ?? 0),
    BTC: Number(wallets.find((wallet) => wallet.asset === "BTC")?.balance ?? 0),
    ETH: Number(wallets.find((wallet) => wallet.asset === "ETH")?.balance ?? 0),
  };

  let transactionIndex = 0;

  const ethPrices = ethHistory.map((item) => ({
    timestamp: item.timestamp,
    price: item.price,
  }));

  function getEthPriceAt(timestamp) {
    let closest = ethPrices[0];

    for (const item of ethPrices) {
      if (item.timestamp > timestamp) {
        break;
      }

      closest = item;
    }

    return closest?.price ?? 0;
  }

  const history = [];

  for (let i = btcHistory.length - 1; i >= 0; i--) {
    const point = btcHistory[i];

    while (
      transactionIndex < transactions.length &&
      new Date(transactions[transactionIndex].createdAt).getTime() >
        point.timestamp
    ) {
      reverseTransaction(balances, transactions[transactionIndex]);

      transactionIndex++;
    }

    const btcPrice = point.price;
    const ethPrice = getEthPriceAt(point.timestamp);

    const portfolioValue =
      balances.USD + balances.BTC * btcPrice + balances.ETH * ethPrice;

    history.push({
      timestamp: point.timestamp,
      price: portfolioValue,
    });
  }

  return history.reverse();
}

function reverseTransaction(balances, transaction) {
  const amount = Number(transaction.amount);
  const total = Number(transaction.total ?? 0);

  if (transaction.type === "DEPOSIT") {
    balances[transaction.asset] -= amount;
  }

  if (transaction.type === "BUY") {
    balances[transaction.asset] -= amount;
    balances.USD += total;
  }
  if (transaction.type === "SELL") {
    balances[transaction.asset] += amount;
    balances.USD -= total;
  }
}

module.exports = {
  getPortfolioHistory,
};
