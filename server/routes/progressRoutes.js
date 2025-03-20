const express = require("express");
const { addProgress, getUserProgress, getWorkoutProgress, deleteUserProgress, updateProgress, deleteProgress } = require("../controllers/progressController");

const router = express.Router();

router.post("/add", addProgress); 
router.get("/:user_id", getUserProgress); 
router.get("/", getWorkoutProgress);
router.delete("/:id", deleteProgress);
router.put("/:id",updateProgress)
module.exports = router;
