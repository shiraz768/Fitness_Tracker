const mongoose = require("mongoose")
const Routine = require("../models/routineModel");



exports.addRoutine = async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    let { user_id, exercisename, category, tags, sets, reps, weight, notes, dateTime } = req.body;

    if (!user_id || !exercisename || !category || !sets || !reps) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    
    category = mongoose.Types.ObjectId.createFromHexString(category);
    tags = tags.map(tag => mongoose.Types.ObjectId.createFromHexString(tag));

    const routine = new Routine({ user_id, exercisename, category, tags, sets, reps, weight, notes, dateTime });
    await routine.save();

    res.status(201).json({ message: "Routine added successfully", routine });
  } catch (error) {
    console.error("Error adding routine:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


exports.getRoutines = async (req, res) => {
  try {
    const user_id = req.query.user_id; 
    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    console.log("Fetching routines for user:", user_id);

    const routines = await Routine.find({ user_id })
      .populate({
        path: "category",
        select: "name",
        options: { strictPopulate: false } 
      })
      .populate({
        path: "tags",
        select: "name",
        options: { strictPopulate: false } 
      });

    res.status(200).json(routines);
  } catch (error) {
    console.error("Error fetching routines:", error);
    res.status(500).json({ message: "Server error" });
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
