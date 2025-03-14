const Tag = require("../models/tagModel");

const addTag = async (req, res) => {
  try {
    const { name, description, createdBy } = req.body;

    if (!name || !createdBy) {
      return res.status(400).json({ message: "Tag name and user ID are required" });
    }

    const newTag = new Tag({
      name,
      description: description || "",
      createdBy,
    });

    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addTag, getTags };
