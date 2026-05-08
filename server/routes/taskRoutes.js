const express = require("express");

const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE TASK
router.post("/create", authMiddleware, async (req, res) => {

  try {

    const {
      title,
      description,
      project,
      assignedTo,
      dueDate
    } = req.body;

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      dueDate,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// GET ALL TASKS
router.get("/", authMiddleware, async (req, res) => {

  try {

    const tasks = await Task.find()
      .populate("project", "title")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// GET SINGLE TASK
router.get("/:id", authMiddleware, async (req, res) => {

  try {

    const task = await Task.findById(req.params.id)
      .populate("project", "title")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// UPDATE TASK STATUS
router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;