const express = require("express");
const cors = require("cors"); // import cors
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const commentRoutes = require("./routes/commentRoutes");
const app = express();
app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
