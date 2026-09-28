const express = require("express");
const { requireAuth } = require("../middleware/auth.middleware");
const prisma = require("../lib/prisma");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const wallets = await prisma.wallet.findMany({
    where: {
      userId: req.userId,
    },
    select: {
      id: true,
      asset: true,
      balance: true,
    },
  });

  res.json(wallets);
});

module.exports = router;
