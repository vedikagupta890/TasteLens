const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found"});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password"});

    // 3. Generate tokens
    const accessToken = jwt.sign(
      { id: user._id },
      "mysecretkey",
      { expiresIn: "5h" } // short life
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      "myrefreshsecret",
      { expiresIn: "30d" } // long life
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.json({ message: "Login successful!", accessToken, refreshToken });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};