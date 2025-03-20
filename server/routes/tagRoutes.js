const express = require("express");
const router = express.Router();
const { addTag, getTags, deleteTag, updateTag} = require("../controllers/tagController");

router.post("/add", addTag);
router.get('/',getTags);
router.delete('/:id',deleteTag);
router.put("/:id", updateTag)
module.exports = router;
