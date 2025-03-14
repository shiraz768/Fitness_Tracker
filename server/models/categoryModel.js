const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      minlength: [2, "Category name must be at least 2 characters"],
      maxlength: [50, "Category name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links category to a user
      required: true,
    },
  },
  { timestamps: true }
);

// Index for faster lookups
categorySchema.index({ name: 1 });

module.exports = mongoose.model("Category", categorySchema);
