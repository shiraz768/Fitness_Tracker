const mongoose = require("mongoose");

const mealTypeSchema = new mongoose.Schema({
  user_Id: { type: mongoose.Schema.ObjectId, ref: "User", required: true }, 
  mealtypename: { type: String, required: true },
  date:{type: Date, default: Date.now, required: true}
}, { timestamps: true });

const MealType = mongoose.model("MealType", mealTypeSchema);
module.exports = MealType;
