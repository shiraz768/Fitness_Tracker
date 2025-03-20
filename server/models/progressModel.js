const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true, default: Date.now },
  weight: { type: Number, required: true },
  chest: { type: Number, required: true },
  waist: { type: Number, required: true },
  hips: { type: Number, required: true },
  runTime: { type: Number, required: true },
  benchPress: { type: Number, required: true },
  squat: { type: Number, required: true },
  deadLift: { type: Number, required: true },
  exerciseProgress: [{ 
    routine_id: { type: mongoose.Schema.Types.ObjectId, ref: "Routine" },
    exerciseName: String,
    weightUsed: Number,
    repsCompleted: Number,
  }]
});

const Progress = mongoose.model("Progress", ProgressSchema);
module.exports = Progress