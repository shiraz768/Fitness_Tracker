const express = require('express');
const router = express.Router();
const {
    createReminder,
    getReminders,
    updateReminder,
    deleteReminder
} = require('../controllers/reminderController');



router.post('/', createReminder);
router.get('/:userId', getReminders);
router.put('/:id', updateReminder);
router.delete('/:id', deleteReminder);

module.exports = router;