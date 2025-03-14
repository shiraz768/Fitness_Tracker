const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
console.log(email)
   
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

module.exports = {loginUser};
