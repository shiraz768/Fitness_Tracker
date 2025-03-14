const mongoose = require("mongoose");

const routineSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exercisename: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Routine belongs to a category
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag", // Routine can have multiple tags
      },
    ],
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number },
    notes: { type: String, trim: true },
    dateTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Routine = mongoose.model("Routine", routineSchema);
module.exports = Routine;
