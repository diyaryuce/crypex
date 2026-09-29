const express = require("express");
const { requireAuth } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");
const { orderSchema } = require("../schemas/order.schema");
const { buy, sell } = require("../controllers/order.controller");

const router = express.Router();

router.post("/buy", requireAuth, validate(orderSchema), buy);
router.post("/sell", requireAuth, validate(orderSchema), sell);

module.exports = router;
