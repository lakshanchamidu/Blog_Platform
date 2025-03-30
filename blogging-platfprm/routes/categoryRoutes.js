// routes/categoryRoutes.js
const express = require("express");
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, categoryController.createCategory);
router.get("/", categoryController.getCategories);

module.exports = router;
