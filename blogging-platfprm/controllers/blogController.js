// controllers/blogController.js
const Blog = require("../model/Blog");
const User = require("../model/User");
const Category = require("../model/Category");

const createBlog = async (req, res) => {
  const { title, content, categoryId } = req.body;

  if (!req.user || !req.user.userId) {
    return res.status(401).json({ message: "Unauthorized: User info missing" });
  }

  const blog = new Blog({
    title,
    content,
    userId: req.user.userId,
    categoryId,
  });

  try {
    await blog.save();
    return res.status(201).json({ message: "Blog created", blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ message: "Error creating blog" });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("userId", "name")
      .populate("categoryId", "name");
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching blogs" });
  }
};

const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id)
      .populate("userId", "name email") // populate user details
      .populate("categoryId", "name"); // populate category details

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return res.status(500).json({ message: "Error fetching blog" });
  }
};

module.exports = { createBlog, getBlogs, getBlogById };
