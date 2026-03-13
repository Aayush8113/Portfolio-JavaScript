// NOTE: You must have a Message model and a sendEmail utility for this to work fully.
const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail.js'); 

const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Message({ name, email, message });
    const savedMessage = await newMessage.save();

    // --- We still need the email sending logic to prevent a crash ---
    try {
      await sendEmail({
        subject: `New Portfolio Contact from ${name}`,
        message: `From: ${name} (${email})\n\n${message}`, 
        html: `<h1>New Message from your Portfolio</h1><p>From: ${name} (${email})</p><p>Message: ${message}</p>`,
      });
    } catch (emailError) {
      console.error('Email failed to send but message was saved:', emailError);
    }

    res.status(201).json({ 
      success: true, 
      message: 'Message received! I will get back to you soon.',
      data: savedMessage 
    });

  } catch (error) {
    console.error('Error saving message:', error);
    // Use error.message for more specific client-side feedback if available
    res.status(400).json({ success: false, message: 'Failed to send message.', error: error.message });
  }
};

module.exports = {
  createMessage,
};