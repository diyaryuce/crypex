const {
  getMarketPrices,
  getMarketHistory,
} = require("../services/market.services");

async function getPrices(req, res) {
  try {
    const prices = await getMarketPrices();

    res.json(prices);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch market prices",
    });
  }
}

async function getHistory(req, res) {
  try {
    const { asset } = req.params;
    const { range = "1D" } = req.query;

    const history = await getMarketHistory(
      asset.toUpperCase(),
      range.toUpperCase(),
    );

    res.json(history);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      error: error.message,
    });
  }
}

module.exports = {
  getPrices,
  getHistory,
};
