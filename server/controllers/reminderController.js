// controllers/reminderController.js
const Reminder = require('../models/reminderModels');
const Goal = require('../models/goalModel');



exports.createReminder = async (req, res) => {
    try {
        const { userId, type, time, message, repeat, snoozeTime } = req.body;

        if (!['workout', 'meal', 'medication', 'custom'].includes(type)) {
            return res.status(400).json({ success: false, message: 'Invalid reminder type' });
        }

        if (!time || isNaN(new Date(time))) {
            return res.status(400).json({ success: false, message: 'Invalid date/time' });
        }

        if (repeat && !['none', 'daily', 'weekly'].includes(repeat)) {
            return res.status(400).json({ success: false, message: 'Invalid repeat option' });
        }

        if (snoozeTime !== undefined && (isNaN(snoozeTime) || snoozeTime < 0)) {
            return res.status(400).json({ success: false, message: 'Invalid snooze time' });
        }

        const newReminder = new Reminder({
            userId,
            type,
            message,
            time: new Date(time),
            repeat,
            snoozeTime
        });

        await newReminder.save();

        res.status(201).json({
            success: true,
            message: 'Reminder created successfully',
            reminder: newReminder
        });

    } catch (error) {
        console.error('Error creating reminder:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

exports.getReminders = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const reminders = await Reminder.find({ userId }).sort({ time: 1 });

        res.status(200).json({
            success: true,
            count: reminders.length,
            reminders
        });

    } catch (error) {
        console.error('Error fetching reminders:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

exports.updateReminder = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, time, message, repeat, snoozeTime, status } = req.body;
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const reminder = await Reminder.findOne({ _id: id, userId });

        if (!reminder) {
            return res.status(404).json({ success: false, message: 'Reminder not found' });
        }

        if (type && !['workout', 'meal', 'medication', 'custom'].includes(type)) {
            return res.status(400).json({ success: false, message: 'Invalid reminder type' });
        }

        if (time && isNaN(new Date(time))) {
            return res.status(400).json({ success: false, message: 'Invalid date/time' });
        }

        if (repeat && !['none', 'daily', 'weekly'].includes(repeat)) {
            return res.status(400).json({ success: false, message: 'Invalid repeat option' });
        }

        if (snoozeTime !== undefined && (isNaN(snoozeTime) || snoozeTime < 0)) {
            return res.status(400).json({ success: false, message: 'Invalid snooze time' });
        }

        if (status && !['pending', 'completed', 'missed'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        if (type) reminder.type = type;
        if (message) reminder.message = message;
        if (time) reminder.time = new Date(time);
        if (repeat) reminder.repeat = repeat;
        if (snoozeTime !== undefined) reminder.snoozeTime = snoozeTime;
        if (status) reminder.status = status;

        await reminder.save();

        res.status(200).json({
            success: true,
            message: 'Reminder updated successfully',
            reminder
        });

    } catch (error) {
        console.error('Error updating reminder:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

exports.deleteReminder = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const reminder = await Reminder.findOneAndDelete({ _id: id, userId });

        if (!reminder) {
            return res.status(404).json({ success: false, message: 'Reminder not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Reminder deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting reminder:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.snoozeReminder = async (req, res) => {
    try {
      const reminder = await Reminder.findById(req.params.id);
      const snoozeMinutes = req.body.minutes;
      
      reminder.time = new Date(Date.now() + snoozeMinutes * 60 * 1000);
      reminder.status = 'pending';
      
      await reminder.save();
      scheduleReminders(); 
      
      res.status(200).json(reminder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.createGoal = async (req, res) => {
  try {
    const {userId, goal } = req.body;

    if (!goal) {
      return res.status(400).json({ message: "Goal is required" });
    }

    const newGoal = new Goal({
      userId,
      goal
    });

    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


exports.getGoals = async (req, res) => {
    try {
        const userId = req.user.id;
        const goals = await Goal.find({ userId }).sort({ createdAt: -1 });
        
        res.status(200).json({ 
            success: true, 
            count: goals.length,
            goals 
        });

    } catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, completed } = req.body;
        const userId = req.user.id;

        const goal = await Goal.findOne({ _id: id, userId });

        if (!goal) {
            return res.status(404).json({ 
                success: false, 
                message: 'Goal not found' 
            });
        }

        if (text) {
            if (text.trim().length < 3) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Goal text must be at least 3 characters' 
                });
            }
            goal.text = text.trim();
        }

        if (typeof completed === 'boolean') {
            goal.completed = completed;
            goal.completedAt = completed ? new Date() : null;
        }

        await goal.save();
        
        res.status(200).json({ 
            success: true, 
            message: 'Goal updated successfully',
            goal 
        });

    } catch (error) {
        console.error('Error updating goal:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const goal = await Goal.findOneAndDelete({ _id: id, userId });

        if (!goal) {
            return res.status(404).json({ 
                success: false, 
                message: 'Goal not found' 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Goal deleted successfully' 
        });

    } catch (error) {
        console.error('Error deleting goal:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
};