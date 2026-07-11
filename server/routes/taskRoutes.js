const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// CREATE Task
router.post("/tasks", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();

        res.status(201).json({
            message: "Task Added Successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// READ All Tasks
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find().sort({ _id: -1 });
        res.json(tasks);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// UPDATE Task
router.put("/tasks/:id", async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, req.body);

        res.json({
            message: "Task Updated Successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// DELETE Task
router.delete("/tasks/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);

        res.json({
            message: "Task Deleted Successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;