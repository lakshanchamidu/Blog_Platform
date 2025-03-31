// controllers/commentController.js
const Comment = require("../model/Comment");
const Blog = require("../model/Blog");

// Add a comment to a blog
const addComment = async (req, res) => {
  const { blogId, content } = req.body;

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const comment = new Comment({
    content,
    userId: req.user.userId,
    blogId,
  });

  try {
    await comment.save();
    return res
      .status(201)
      .json({ message: "Comment added successfully", comment });
  } catch (error) {
    return res.status(500).json({ message: "Error adding comment", error });
  }
};

// Get all comments for a specific blog
const getComments = async (req, res) => {
  const { blogId } = req.params;

  try {
    const comments = await Comment.find({ blogId }).populate("userId", "name");
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching comments", error });
  }
};

module.exports = { addComment, getComments };
