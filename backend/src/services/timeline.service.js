// src/services/timeline.service.js
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../utils/ApiError');
const timelineEventRepository = require('../repositories/timelineEvent.repository');
const coupleService = require('./couple.service');
const notificationService = require('./notification.service');

class TimelineService {
  async getEvents(userId) {
    const activeCouple = await coupleService.getRequiredActiveCouple(userId);
    const coupleId = activeCouple.id;
    return await timelineEventRepository.findAllByCouple(coupleId);
  }

  async createEvent(userId, data) {
    if (!data.title || !data.title.trim()) {
      throw new ApiError(400, 'Title is required');
    }
    if (!data.event_date) {
      throw new ApiError(400, 'Event date is required');
    }

    const activeCouple = await coupleService.getRequiredActiveCouple(userId);
    const coupleId = activeCouple.id;

    const event = await timelineEventRepository.create({
      id: uuidv4(),
      couple_id: coupleId,
      created_by: userId,
      title: data.title.trim(),
      description: data.description ? data.description.trim() : null,
      event_date: data.event_date,
      event_type: data.event_type || 'custom',
      emoji: data.emoji || '❤️',
    });

    if (coupleId) {
      try {
        const partner = await coupleService.getPartner(userId, coupleId);
        if (partner?.id) {
          await notificationService.createSystemNotification(
            partner.id,
            userId,
            'TIMELINE_EVENT_CREATED',
            event.id,
            `New milestone added: "${event.title}"`
          );
        }
      } catch (_err) {
        // Non-blocking notification
      }
    }

    return event;
  }

  async updateEvent(userId, eventId, data) {
    const event = await timelineEventRepository.findById(eventId);
    if (!event) {
      throw new ApiError(404, 'Timeline event not found');
    }

    await coupleService.findMembership(userId, event.couple_id);

    return await timelineEventRepository.update(eventId, {
      title: data.title !== undefined ? data.title.trim() : event.title,
      description: data.description !== undefined ? (data.description ? data.description.trim() : null) : event.description,
      event_date: data.event_date || event.event_date,
      event_type: data.event_type || event.event_type,
      emoji: data.emoji || event.emoji,
    });
  }

  async deleteEvent(userId, eventId) {
    const event = await timelineEventRepository.findById(eventId);
    if (!event) {
      throw new ApiError(404, 'Timeline event not found');
    }

    await coupleService.findMembership(userId, event.couple_id);

    await timelineEventRepository.remove(eventId);
    return { deleted: true };
  }
}

module.exports = new TimelineService();