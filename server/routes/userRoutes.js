const express = require("express");
const { registerUser } = require("../controllers/registerUser");
const { loginUser } = require("../controllers/loginUser");
const upload = require("../middleware/upload")

const router = express.Router();


router.post("/register", upload.single("profilepic"), registerUser);


router.post("/login", loginUser);



  module.exports =router
