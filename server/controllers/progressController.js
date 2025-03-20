const Progress = require("../models/progressModel");
const Routine = require("../models/routineModel");

exports.addProgress = async (req, res) => {
  try {
    const { user_id, weight, chest, waist, hips, runTime, benchPress, squat, deadLift, exerciseProgress } = req.body;

    if (!user_id || !weight || !chest || !waist || !hips || !runTime || !benchPress || !squat || !deadLift) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const progress = new Progress({
      user_id,
      weight,
      chest,
      waist,
      hips,
      runTime,
      benchPress,
      squat,
      deadLift,
      exerciseProgress: exerciseProgress || [], 
    });

    await progress.save();
    res.status(201).json({ message: "Progress added successfully", progress });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getWorkoutProgress = async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log(user_id)
    if (!user_id) return res.status(400).json({ message: "User ID is required" });

    const progressData = await Progress.find({ user_id }).sort({ date: "asc" });

    const routineData = await Routine.find({ user_id });

    res.status(200).json({ progressData, routineData });
  } catch (error) {
    console.error("Error fetching workout progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserProgress = async (req, res) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const progress = await Progress.find({ user_id })
      .populate("exerciseProgress.routine_id", "exercisename") 
      .sort({ date: 1 });

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      weight,
      chest,
      waist,
      hips,
      runTime,
      benchPress,
      squat,
      deadLift,
      date,
      exerciseProgress,
    } = req.body;


    const updatedProgress = await Progress.findByIdAndUpdate(
      id,
      {
        weight,
        chest,
        waist,
        hips,
        runTime,
        benchPress,
        squat,
        deadLift,
        date,
        exerciseProgress,
      },
      { new: true }
    );

    if (!updatedProgress) {
      return res.status(404).json({ success: false, message: "Progress record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Progress updated successfully",
      progress: updatedProgress,
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.deleteProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProgress = await Progress.findByIdAndDelete(id);

    if (!deletedProgress) {
      return res.status(404).json({ success: false, message: "Progress record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Progress deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting progress:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

