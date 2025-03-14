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
const getMealTypes = async (req, res) => {
    try {
      const mealTypes = await MealType.find(); 
      res.json(mealTypes);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
  
  module.exports = { addMealType, getMealTypes };