const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
    try {
        const { username, email, password, theme, notification } = req.body;
        console.log(req.file.path)
        
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        let profilePicUrl = req.file ? req.file.path : "upload/default.jpg"

   
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            theme,
            notification,
            profilepic:profilePicUrl
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: { username, email, theme, notification, profilePicUrl }
        });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { registerUser };
