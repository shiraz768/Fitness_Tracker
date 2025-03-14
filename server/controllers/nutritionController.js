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
        const { user_Id } = req.body; 
        
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

module.exports = { addNutrition, getUserNutrition };
