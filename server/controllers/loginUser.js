const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
   
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error occurred" });
  }
};

const updateUserSettings = async (req, res) => {
  try {
    const { id } = req.params; 
    const { username, email, password } = req.body;
    
    const updateData = { username, email };
    if (password) {
   
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }
    
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({
      message: "User settings updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user settings:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { loginUser, updateUserSettings };
