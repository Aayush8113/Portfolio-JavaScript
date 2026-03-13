const express = require('express');
const router = express.Router();
const { createMessage } = require('../../controllers/messageController.js');

// POST /api/messages
router.post('/', createMessage);

module.exports = router;