const { buyCrypto, sellCrypto } = require("../services/order.service");

async function buy(req, res) {
  try {
    const { asset, amount } = req.body;

    const result = await buyCrypto(req.userId, asset, amount);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

async function sell(req, res) {
  try {
    const { asset, amount } = req.body;

    const result = await sellCrypto(req.userId, asset, amount);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

module.exports = { buy, sell };
