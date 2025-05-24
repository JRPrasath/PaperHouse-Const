const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ date: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get ongoing projects
router.get('/ongoing', async (req, res) => {
    try {
        const projects = await Project.find({ status: 'ongoing' }).sort({ date: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get completed projects
router.get('/completed', async (req, res) => {
    try {
        const projects = await Project.find({ status: 'completed' }).sort({ date: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new project (admin only)
router.post('/', async (req, res) => {
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        images: req.body.images,
        status: req.body.status,
        location: req.body.location,
        completionDate: req.body.completionDate
    });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router; 