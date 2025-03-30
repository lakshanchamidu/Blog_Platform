// routes/commentRoutes.js
const express = require("express");
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, commentController.addComment);
router.get("/:blogId", commentController.getComments);
module.exports = router;
