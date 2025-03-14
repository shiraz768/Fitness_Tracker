const express = require("express");
const {addNutrition} = require("../controllers/nutritionController");
const router = express.Router();



router.post("/add", addNutrition);


module.exports = router