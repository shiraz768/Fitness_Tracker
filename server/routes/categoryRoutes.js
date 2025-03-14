const express = require("express");
const router = express.Router();
const { addCategory, getCategories } = require("../controllers/categoryController");

// ✅ Route to add a category
router.post("/add", addCategory);

// ✅ Route to fetch all categories
router.get("/", getCategories);

module.exports = router;
