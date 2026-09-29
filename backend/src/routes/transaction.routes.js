const express = require("express");
const { requireAuth } = require("../middleware/auth.middleware");
const prisma = require("../lib/prisma");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: req.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(transactions);
});

module.exports = router;
