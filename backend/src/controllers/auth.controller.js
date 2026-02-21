const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({
      _id: user._id,
      name: user.fullName,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};