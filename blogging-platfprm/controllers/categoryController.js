// controllers/categoryController.js
const Category = require("../model/Category");

// Create a new category
const createCategory = async (req, res) => {
  const { name, description } = req.body;

  const category = new Category({
    name,
    description,
  });

  try {
    await category.save();
    return res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    return res.status(500).json({ message: "Error creating category", error });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching categories", error });
  }
};

module.exports = { createCategory, getCategories };
