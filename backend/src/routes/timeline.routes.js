// src/routes/timeline.routes.js

const express = require('express');
const router = express.Router();
const timelineController = require('../controllers/timeline.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Apply authentication middleware
router.use(authMiddleware);

// GET /api/v1/timeline?page=1&limit=10
router.get('/', timelineController.getFeed);

module.exports = router;