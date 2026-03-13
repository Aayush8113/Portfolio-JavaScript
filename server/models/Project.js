const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true, 
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    tags: {
      type: [String], 
      required: false, 
    },
    liveLink: {
      type: String,
      required: false,
    },
    githubLink: {
      type: String,
      required: false,
    },
    challenge: {
      type: String,
      required: false,
    },
    solution: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Project', projectSchema);