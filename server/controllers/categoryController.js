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

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const existingRoutine = await Routine.findOne({ category: id });
    if (existingRoutine) {
      return res.status(400).json({ message: "Cannot delete category. It is linked to existing routines." });
    }

    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addCategory, getCategories, deleteCategory };
