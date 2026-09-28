const { registerUser, loginUser } = require("../services/auth.service");

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

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
}

module.exports = {
  register,
  login,
};
