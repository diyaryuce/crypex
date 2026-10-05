const express = require("express");
const { getPrices, getHistory } = require("../controllers/market.controller");

const router = express.Router();

router.get("/prices", getPrices);

router.get("/history/:asset", getHistory);

module.exports = router;
