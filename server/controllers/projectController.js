const Project = require('../models/Project');
const mongoose = require('mongoose');

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .lean(); 

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.status(200).json(projects);

  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Invalid Project ID' });
    }

    const project = await Project.findById(id).lean();

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
};