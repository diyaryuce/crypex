const { z } = require("zod");

const depositSchema = z.object({
  asset: z.enum(["USD", "BTC", "ETC"]),
  amount: z.number().positive(),
});

module.exports = {
  depositSchema,
};
