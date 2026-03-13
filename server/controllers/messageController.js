const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

/**
 * Helper: Basic Sanitization to prevent XSS
 * Also trims whitespace which is common in form inputs
 */
const sanitizeInput = (text) => {
  if (typeof text !== 'string') return '';
  return text.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const createMessage = async (req, res, next) => {
  try {
    let { name, email, phone, message } = req.body;

    // 1. Sanitize & Trim Inputs
    name = sanitizeInput(name);
    message = sanitizeInput(message);
    phone = sanitizeInput(phone);
    email = email ? email.trim().toLowerCase() : '';

    // 2. Comprehensive Manual Validation
    // Required fields check (merged to include phone from version 1)
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, phone/WhatsApp, and message.',
      });
    }

    // Email format validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // 3. Save to Database
    const newMessage = await Message.create({ 
      name, 
      email, 
      phone, 
      message 
    });

    // 4. Send Premium Email Notification (Gmail Optimized)
    try {
        const emailData = {
          replyTo: email, 
          subject: `New Transmission: ${name}`,
          message: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              
              <div style="background-color: #0f172a; padding: 24px; text-align: center;">
                <h2 style="color: #38bdf8; margin: 0; font-size: 20px; letter-spacing: 2px; text-transform: uppercase;">System Transmission</h2>
                <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">New Client Inquiry via Aayush.dev</p>
              </div>

              <div style="padding: 32px 24px;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                      <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Sender Identity</span><br/>
                      <strong style="color: #0f172a; font-size: 16px;">${name}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                      <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Return Protocol (Email)</span><br/>
                      <a href="mailto:${email}" style="color: #3b82f6; font-size: 16px; text-decoration: none;"><strong>${email}</strong></a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                      <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Comlink (WhatsApp/Phone)</span><br/>
                      <strong style="color: #0f172a; font-size: 16px;">${phone}</strong>
                    </td>
                  </tr>
                </table>

                <div style="margin-top: 16px;">
                  <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Payload Data (Message)</span>
                  <div style="margin-top: 8px; padding: 20px; background-color: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 0 4px 4px 0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                </div>
              </div>

              <div style="background-color: #f1f5f9; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="color: #64748b; margin: 0; font-size: 11px; font-family: monospace, sans-serif; text-transform: uppercase;">
                  Secured by Aayush.dev System Routing
                </p>
              </div>
            </div>
          `
        };

        await sendEmail(emailData);
        
    } catch (emailError) {
        // Log the error but don't fail the whole request since the DB save worked
        console.error("Email delivery failed:", emailError);
    }

    // 5. Success Response
    return res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      data: newMessage,
    });

  } catch (error) {
    // Mongoose Validation Error handling
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    
    // Pass other errors to global error handler
    next(error);
  }
};

module.exports = { createMessage };