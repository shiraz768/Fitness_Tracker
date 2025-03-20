const Nutrition = require("../models/nutritionModel");

const addNutrition = async (req, res) => {
    try {
        const { user_Id, mealType_Id, nutritionname, quantity, calories, carbohydrates, protein, fat } = req.body;
        
        if (!user_Id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const newNutrition = new Nutrition({
            user_Id, 
            mealType_Id,
            nutritionname,
            quantity,
            calories,
            carbohydrates,
            protein,
            fat
        });

        await newNutrition.save();
        res.status(201).json({ message: "Nutrition added successfully", nutrition: newNutrition });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server error", error: e.message });
    }
};


const getUserNutrition = async (req, res) => {
    try {
        const { user_Id } = req.params; 
        
        if (!user_Id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const nutritionData = await Nutrition.find({ user_Id }).populate("mealType_Id");

        res.status(200).json(nutritionData);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server error", error: e.message });
    }
};


const updateNutrition = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nutritionname,
      quantity,
      calories,
      carbohydrates,
      protein,
      fat,
      mealType_Id,
      user_Id,
      notes,
      dateTime,
    } = req.body;


    const updatedNutrition = await Nutrition.findByIdAndUpdate(
      id,
      { nutritionname, quantity, calories, carbohydrates, protein, fat, mealType_Id, user_Id, notes, dateTime },
      { new: true }
    );

    if (!updatedNutrition) {
      return res.status(404).json({ success: false, message: "Nutrition record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Nutrition updated successfully",
      nutrition: updatedNutrition,
    });
  } catch (error) {
    console.error("Error updating nutrition:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteNutrition = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNutrition = await Nutrition.findByIdAndDelete(id);

    if (!deletedNutrition) {
      return res.status(404).json({ success: false, message: "Nutrition record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Nutrition deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting nutrition:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteUserNutrition = async (req, res) =>{
    const {user_Id} = req.params;

if(!user_Id){
    return res.status(400).json({ message: "User ID is required" });
}
const nutritionData = await Nutrition.findByIdAndDelete(user_Id)
res.status(200).json(nutritionData);
}
const getDailyNutritionStats = async (req, res) => {
    try {
      const userId = req.params.userId;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
      }
  

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
  
     
      const meals = await Nutrition.find({
        user_Id: userId,
        createdAt: { $gte: today, $lt: tomorrow },
      });
  

      const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
      const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbohydrates, 0);
      const totalProteins = meals.reduce((sum, meal) => sum + meal.protein, 0);
      const totalFats = meals.reduce((sum, meal) => sum + meal.fat, 0);
  
     
      res.status(200).json({
        totalCalories,
        totalCarbs,
        totalProteins,
        totalFats,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching nutrition data." });
    }
  };

module.exports = { addNutrition, getUserNutrition , deleteUserNutrition, getDailyNutritionStats, updateNutrition};
