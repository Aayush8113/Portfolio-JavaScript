const express = require('express');
const router = express.Router();

// This path (../../) is verified correct for the backend/routes/api structure
const { 
    createMessage 
} = require('../../controllers/messageController.js');

// Define the route for POST /api/messages
// This will resolve to POST /api/messages/ because of the path defined in server.js
router.post('/', createMessage);

module.exports = router;