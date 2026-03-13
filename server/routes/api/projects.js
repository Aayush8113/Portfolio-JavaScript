const express = require('express');
const router = express.Router();
const { getAllProjects, getProjectById } = require('../../controllers/projectController');

// GET /api/projects
router.get('/', getAllProjects);

// GET /api/projects/:id
router.get('/:id', getProjectById);

module.exports = router;