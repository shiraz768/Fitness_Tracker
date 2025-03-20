const mongoose = require("mongoose");
const Category = require("../models/categoryModel");
const Routine = require("../models/routineModel");

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

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching categories" });
  }
};


const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }
    const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
module.exports = { addCategory, getCategories, deleteCategory , updateCategory };
