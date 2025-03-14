const express = require("express");
const { addRoutine, getRoutines, deleteRoutine} = require("../controllers/routineController"); // Import controller functions

const router = express.Router();

router.post("/add", addRoutine);  
router.get("/",getRoutines)
router.delete("/:id",deleteRoutine);
module.exports = router;
