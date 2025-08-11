// routes/blogRoutes.js
const express = require("express");
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, blogController.createBlog);
router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getBlogById);

module.exports = router;
