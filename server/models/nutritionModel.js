const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema({
    user_Id: { type: mongoose.Schema.ObjectId, ref: "User", required: true }, 
    mealType_Id: { type: mongoose.Schema.ObjectId, ref: "MealType", required: true },
    nutritionname: { type: String, required: true },
    quantity: { type: Number, required: true },
    calories: { type: Number, required: true },
    carbohydrates: { type: Number, required: true },
    protein: { type: Number, required: true },
    fat: { type: Number, required: true },
    datetime: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { timestamps: true });

const Nutrition = mongoose.model("Nutrition", nutritionSchema);
module.exports = Nutrition;
