const express = require("express");
const { requireAuth } = require("../middleware/auth.middleware");
const prisma = require("../lib/prisma");

const router = express.Router();

router.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });

  res.json(user);
});

module.exports = router;
