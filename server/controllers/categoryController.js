const mongoose = require("mongoose");
const Category = require("../models/categoryModel");

// ✅ Add Category
const addCategory = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const { name, description, createdBy } = req.body;

    if (!name || !createdBy) {
      return res.status(400).json({ message: "Name and user ID are required" });
    }

    const existingCategory = await Category.findOne({ name, createdBy });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name, description, createdBy });
    await category.save();

    res.status(201).json({ message: "Category added successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Fetch All Categories (NEW FUNCTION)
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories from DB
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error while fetching categories" });
  }
};

// ✅ Export Both Functions
module.exports = { addCategory, getCategories };
