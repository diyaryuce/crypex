const { registerUser } = require("../services/auth.service");

async function register(req, res) {
  try {
    const { email, password } = req.body;

    const user = await registerUser(email, password);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

module.exports = {
  register,
};
