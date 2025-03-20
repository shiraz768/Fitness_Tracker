    const express = require("express");
    const router = express.Router();
    const {addMealType,getMealTypes, deleteMealType, updateMealType} = require("../controllers/mealTypeController")

    router.post("/add", addMealType);
router.get("/",getMealTypes)
router.delete("/:id", deleteMealType);
router.put("/:id",updateMealType)
    module.exports = router