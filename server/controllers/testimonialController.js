const Testimonial = require('../models/Testimonial');

const getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 })
      .lean(); 

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.status(200).json(testimonials);

  } catch (error) {
    next(error); 
  }
};

module.exports = {
  getAllTestimonials,
};