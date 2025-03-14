const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tag name is required"],
      trim: true,
      minlength: [2, "Tag name must be at least 2 characters"],
      maxlength: [30, "Tag name cannot exceed 30 characters"],
    },
    user_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    category: { type: mongoose.Schema.ObjectId, ref: "Category", required: true },

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [150, "Description cannot exceed 150 characters"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
  },
  { timestamps: true }
);


tagSchema.index({ name: 1 });

module.exports = mongoose.model("Tag", tagSchema);
