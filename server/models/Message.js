const mongoose = require('mongoose');

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name can not be more than 100 characters']
  },
  email: {
    type: String,
    match: [emailRegex, 'Please add a valid email'],
    required: [true, 'Please add an email'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please add a WhatsApp/Call number'], // ✅ NOW REQUIRED
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
    maxlength: [5000, 'Message cannot be more than 5000 characters'], 
    trim: true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Message', messageSchema);