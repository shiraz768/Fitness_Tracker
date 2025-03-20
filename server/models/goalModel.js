const { default: mongoose } = require("mongoose");

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  goal: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);