const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.refreshToken = async (req, res) => {
  const { token } = req.body; // refresh token from frontend

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    // Find the user with this refresh token in DB
    const user = await User.findOne({ refreshToken: token });
    if (!user) return res.status(403).json({ error: "Invalid refresh token" });

    // Verify the refresh token
    jwt.verify(token, "myrefreshsecret", (err, decoded) => {
      if (err) return res.status(403).json({ error: "Refresh token expired" });

      // Generate a new access token
      const newAccessToken = jwt.sign(
        { id: decoded.id },
        "mysecretkey",
        { expiresIn: "5h" } // short-lived access token
      );

      res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};