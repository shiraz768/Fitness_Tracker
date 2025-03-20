const express = require("express");
const {addRoutine, getRoutines,getCaloriesVsDuration,deleteRoutine, getRoutineCompletionStats, updateRoutine} = require("../controllers/routineController");

const router = express.Router();

router.post("/add", addRoutine);
router.get("/completion-stats/:user_id",getRoutineCompletionStats)
router.get("/routines/:user_id", getRoutines);
router.delete("/:id", deleteRoutine);
router.get("/calories-vs-duration/:user_id", getCaloriesVsDuration);
router.put('/:id', updateRoutine);
router.delete('/:id', deleteRoutine);
module.exports = router;
