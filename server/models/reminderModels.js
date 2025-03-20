const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['workout', 'meal', 'medication', 'custom'], // Added more types for flexibility
    required: true
  },
  message: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'missed'],
    default: 'pending'
  },
  repeat: {
    type: String,
    enum: ['none', 'daily', 'weekly'],
    default: 'none'
  },
  snoozeTime: {
    type: Number, 
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);
