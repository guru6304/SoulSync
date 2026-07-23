// src/controllers/timeline.controller.js
const timelineService = require('../services/timeline.service');
const ApiResponse = require('../utils/ApiResponse');

class TimelineController {
    async getFeed(req, res, next) {
        try {
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 10;
            const data = await timelineService.getFeed(req.user.id, page, limit);

            return res.status(200).json(
                new ApiResponse(200, data, 'Timeline retrieved successfully')
            );
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TimelineController();