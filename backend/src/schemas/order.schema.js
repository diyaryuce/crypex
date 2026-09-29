const { z } = require("zod");

const orderSchema = z.object({
  asset: z.enum(["BTC", "ETH"]),
  amount: z.number().positive(),
});

module.exports = {
  orderSchema,
};
