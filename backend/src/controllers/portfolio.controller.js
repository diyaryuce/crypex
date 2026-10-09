const { getPortfolioHistory } = require("../services/portfolio.service");

async function getHistory(req, res) {
  try {
    const { range = "1D" } = req.query;

    const history = await getPortfolioHistory(req.userId, range.toUpperCase());

    res.json(history);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      error: error.message,
    });
  }
}

module.exports = {
  getHistory,
};
