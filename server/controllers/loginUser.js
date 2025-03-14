const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
console.log(email)
    // ✅ Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // ✅ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // ✅ Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // ✅ Return success response
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login Error:", error); // Debugging log
    res.status(500).json({ error: "Server error occurred" });
  }
};

module.exports = {loginUser};
