// src/repositories/timelineEvent.repository.js
const { TimelineEvent, User } = require('../models');

class TimelineEventRepository {
  async create(data) {
    return await TimelineEvent.create(data);
  }

  async findById(id) {
    return await TimelineEvent.findByPk(id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'first_name', 'last_name', 'profile_picture'],
        },
      ],
    });
  }

  async findAllByCouple(coupleId) {
    return await TimelineEvent.findAll({
      where: { couple_id: coupleId },
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'first_name', 'last_name', 'profile_picture'],
        },
      ],
      order: [['event_date', 'ASC'], ['created_at', 'ASC']],
    });
  }

  async update(id, data) {
    const event = await TimelineEvent.findByPk(id);
    if (!event) return null;
    return await event.update(data);
  }

  async remove(id) {
    const event = await TimelineEvent.findByPk(id);
    if (!event) return false;
    await event.destroy();
    return true;
  }
}

module.exports = new TimelineEventRepository();
