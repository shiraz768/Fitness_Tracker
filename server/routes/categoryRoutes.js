const express = require("express");
const router = express.Router();
const { addCategory, getCategories,deleteCategory } = require("../controllers/categoryController");


router.post("/add", addCategory);


router.get("/", getCategories);
router.delete("/:id",deleteCategory );

module.exports = router;
