const express = require("express");
const { getUserPreferences, updateUserPreferences, deleteUserPreferences } = require("../controllers/userPreferencesController");

const router = express.Router();

router.get("/:user_id", getUserPreferences); // 
router.put("/:user_id", updateUserPreferences); 
router.delete("/:user_id", deleteUserPreferences); 

module.exports = router;
