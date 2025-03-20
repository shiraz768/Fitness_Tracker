const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/registerUser");
const { loginUser, updateUserSettings } = require("../controllers/loginUser");
const upload = require("../middleware/upload");
const User = require("../models/userModel");


router.post("/register", upload.single("profilepic"), registerUser);


router.post("/login", loginUser);

router.put("/:id", updateUserSettings);

router.get("/:id", async (req, res) => {
  try {
    // Use .select() to include the fields you need. 
    // Here, we explicitly exclude the password.
    const user = await User.findById(req.params.id).select("username profilepic email preferences");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



module.exports = router;
