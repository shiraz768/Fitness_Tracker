const express = require("express");
const router = express.Router();
const { addCategory, getCategories,deleteCategory, updateCategory } = require("../controllers/categoryController");


router.post("/add", addCategory);


router.get("/", getCategories);
router.delete("/:id",deleteCategory );
router.put("/:id", updateCategory)
module.exports = router;
