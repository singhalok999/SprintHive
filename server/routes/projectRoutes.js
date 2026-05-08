const express = require("express");

const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE PROJECT
router.post("/create", authMiddleware, async (req, res) => {

  try {

    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      createdBy: req.user.id,
      members: [req.user.id]
    });

    res.status(201).json({
      message: "Project created successfully",
      project
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// GET ALL PROJECTS
router.get("/", authMiddleware, async (req, res) => {

  try {

    const projects = await Project.find({
      members: req.user.id
    }).populate("members", "name email");

    res.status(200).json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;