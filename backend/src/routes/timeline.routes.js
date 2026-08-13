// src/routes/timeline.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/timeline.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/', controller.getEvents);
router.post('/', controller.createEvent);
router.put('/:id', controller.updateEvent);
router.delete('/:id', controller.deleteEvent);

module.exports = router;