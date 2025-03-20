const mongoose = require("mongoose");
const Routine = require("../models/routineModel");

exports.addRoutine = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    
    let { user_id, exercisename, category, tags, sets, reps, weight, notes, dateTime, duration, caloriesBurned } = req.body;
    
    if (!user_id || !exercisename || !category || !sets || !reps || !duration || !caloriesBurned) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
    
    category = mongoose.Types.ObjectId.createFromHexString(category);
    tags = tags.map(tag => mongoose.Types.ObjectId.createFromHexString(tag));

    const routine = new Routine({ user_id, exercisename, category, tags, sets, reps, weight, notes, dateTime, duration, caloriesBurned });
    await routine.save();
    
    res.status(201).json({ message: "Routine added successfully", routine });
  } catch (error) {
    console.error("Error adding routine:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getRoutines = async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log(user_id)
    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    console.log("Fetching routines for user:", user_id);
    
    const routines = await Routine.find({ user_id: new mongoose.Types.ObjectId(user_id) })
    .populate({ path: "category", select: "name", options: { strictPopulate: false } })
    .populate({ path: "tags", select: "name", options: { strictPopulate: false } });
    
    res.status(200).json(routines);
  } catch (error) {
    console.error("Error fetching routines:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateRoutine = async (req, res) => {
  try {
    const { id } = req.params;  
    const { exercisename, category, tags, sets, reps, weight, duration, caloriesBurned, notes, dateTime } = req.body;
    
    
    const updatedRoutine = await Routine.findOneAndUpdate(
      { _id: id },
      { exercisename, category, tags, sets, reps, weight, duration, caloriesBurned, notes, dateTime },
      { new: true }
    );

    if (!updatedRoutine) {
      return res.status(404).json({ success: false, message: "Routine not found" });
    }

    res.status(200).json({
      success: true,
      message: "Routine updated successfully",
      routine: updatedRoutine,
    });
  } catch (error) {
    console.error("Error updating routine:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
exports.deleteRoutine = async (req, res) => {
  try {
    const { id } = req.params; 

  

    const routine = await Routine.findOneAndDelete({ _id: id });

    if (!routine) {
      return res.status(404).json({ success: false, message: "Routine not found" });
    }

    res.status(200).json({
      success: true,
      message: "Routine deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting routine:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getRoutineCompletionStats = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const routines = await Routine.find({ user_id: user_id });

    if (!routines.length) {
      return res.status(404).json({ message: "No routines found." });
    }

    const completed = routines.filter((r) => r.reps > 0 && r.sets > 0).length;
    const total = routines.length;
    const skipped = total - completed;

    res.status(200).json({ completed, skipped });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching routines." });
  }
};

exports.deleteRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting routine with ID:", id);
    
    const routine = await Routine.findByIdAndDelete(id);
    
    if (!routine) {
      return res.status(404).json({ message: "Routine not found" });
    }
    
    res.status(200).json({ message: "Routine deleted successfully" });
  } catch (error) {
    console.error("Error deleting routine:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


exports.getCaloriesVsDuration = async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log(user_id)
    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    const routines = await Routine.find({ user_id }).select("duration caloriesBurned");

    res.status(200).json(routines);
  } catch (error) {
    console.error("Error fetching calories vs duration:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
