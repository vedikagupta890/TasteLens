const User = require("../models/User");

exports.logout = async (req, res) => {
  try {
    const { username } = req.body;

    // Clear refresh token directly
    await User.updateOne({ username }, { $set: { refreshToken: null } });

    res.json({ message: "Logout successful!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//can later switch to token based logout
