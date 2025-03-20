const express = require("express");
const {addNutrition, getUserNutrition, deleteUserNutrition, getDailyNutritionStats, updateNutrition} = require("../controllers/nutritionController");
const router = express.Router();



router.post("/add", addNutrition);
router.get("/:user_Id", getUserNutrition);
router.delete("/:user_Id", deleteUserNutrition)
router.get("/daily-stats/:userId", getDailyNutritionStats);
router.put("/:id", updateNutrition)
module.exports = router