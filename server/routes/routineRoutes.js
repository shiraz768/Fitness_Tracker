const express = require("express");
const { addRoutine, getRoutines} = require("../controllers/routineController"); // Import controller functions

const router = express.Router();

// Define routes
router.post("/add", addRoutine);  // Add a new routine
router.get("/",getRoutines)

module.exports = router;
