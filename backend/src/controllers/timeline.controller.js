// src/controllers/timeline.controller.js
const timelineService = require('../services/timeline.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const getEvents = asyncHandler(async (req, res) => {
  const events = await timelineService.getEvents(req.user.id);
  res.status(200).json(
    new ApiResponse(200, events, 'Timeline events fetched successfully')
  );
});

const createEvent = asyncHandler(async (req, res) => {
  const event = await timelineService.createEvent(req.user.id, req.body);
  res.status(201).json(
    new ApiResponse(201, event, 'Timeline event created successfully')
  );
});

const updateEvent = asyncHandler(async (req, res) => {
  const event = await timelineService.updateEvent(req.user.id, req.params.id, req.body);
  res.status(200).json(
    new ApiResponse(200, event, 'Timeline event updated successfully')
  );
});

const deleteEvent = asyncHandler(async (req, res) => {
  const result = await timelineService.deleteEvent(req.user.id, req.params.id);
  res.status(200).json(
    new ApiResponse(200, result, 'Timeline event deleted successfully')
  );
});

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};