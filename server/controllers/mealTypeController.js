const mongoose =require("mongoose");
const MealType = require("../models/mealTypeModel");



const addMealType = async (req, res) => {
  try {
    const { mealtypename } = req.body;
    const user_Id = req.body.user_Id; 

    if (!user_Id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const newMealType = new MealType({ user_Id, mealtypename });
    await newMealType.save();

    res.status(201).json(newMealType);
  } catch (error) {
    res.status(500).json({ error: "Failed to add meal type" });
  }
};


const updateMealType = async (req, res) => {
  try {
    const { id } = req.params;
    const { mealtypename } = req.body;

    if (!mealtypename) {
      return res.status(400).json({ message: "Meal type name is required" });
    }

    const updatedMealType = await MealType.findByIdAndUpdate(
      id,
      { mealtypename },
      { new: true }
    );

    if (!updatedMealType) {
      return res.status(404).json({ message: "Meal type not found" });
    }

    res.status(200).json({
      message: "Meal type updated successfully",
      mealType: updatedMealType,
    });
  } catch (error) {
    console.error("Error updating meal type:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteMealType = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMealType = await MealType.findByIdAndDelete(id);

    if (!deletedMealType) {
      return res.status(404).json({ message: "Meal type not found" });
    }

    res.status(200).json({ message: "Meal type deleted successfully" });
  } catch (error) {
    console.error("Error deleting meal type:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMealTypes = async (req, res) => {
    try {
      const mealTypes = await MealType.find(); 
      res.json(mealTypes);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
  
  module.exports = { addMealType, getMealTypes, deleteMealType , updateMealType};