const express = require("express");
const router = express.Router();
const { addTag, getTags, deleteTag} = require("../controllers/tagController");

router.post("/add", addTag);
router.get('/',getTags);
router.delete('/:id',deleteTag)
module.exports = router;
