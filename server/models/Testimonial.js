const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testimonialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, 
    },
    quote: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: false, 
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);