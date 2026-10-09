const express = require("express");
const { requireAuth } = require("../middleware/auth.middleware");
const { getHistory } = require("../controllers/portfolio.controller");

const router = express.Router();

router.get("/history", requireAuth, getHistory);

module.exports = router;
