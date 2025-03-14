    const express = require("express");
    const router = express.Router();
    const {addMealType,getMealTypes} = require("../controllers/mealTypeController")

    router.post("/add", addMealType);
router.get("/",getMealTypes)

    module.exports = router