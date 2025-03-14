const Routine = require("../models/routineModel");

exports.addRoutine = async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debugging
    console.log("Received userId:", req.body.user_id);

    const { user_id, exercisename, category, tags, sets, reps, weight, notes, dateTime } = req.body;

    if (!user_id || !exercisename || !category || !sets || !reps) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

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
    const user_id = req.query.user_id; // ✅ Extract user_id from query params
    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    console.log("Fetching routines for user:", user_id);

    const routines = await Routine.find({ user_id })
    .populate("category", "name") 
    .populate("tags", "name");
  

    res.status(200).json(routines);
  } catch (error) {
    console.error("Error fetching routines:", error);
    res.status(500).json({ message: "Server error" });
  }
};



