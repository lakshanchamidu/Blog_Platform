// controllers/blogController.js
const Blog = require("../model/Blog");
const User = require("../model/User");
const Category = require("../model/Category");

const createBlog = async (req, res) => {
  const { title, content, categoryId } = req.body;

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

module.exports = { createBlog, getBlogs };
