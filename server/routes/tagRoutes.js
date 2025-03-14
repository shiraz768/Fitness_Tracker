const express = require("express");
const router = express.Router();
const { addTag, getTags} = require("../controllers/tagController");

router.post("/add", addTag);
router.get('/',getTags);

module.exports = router;
