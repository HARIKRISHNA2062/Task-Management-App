const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const taskRoutes = require("./server/routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Task Management Backend Running 🚀");
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.error("❌ MongoDB Error:", err);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});