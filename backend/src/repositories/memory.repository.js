const { Memory, User, Couple } = require("../models");

class MemoryRepository {
  async create(data) {
    return await Memory.create(data);
  }

  async findById(id) {
    return await Memory.findByPk(id, {
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "first_name", "last_name", "profile_picture"],
        },
        {
          model: Couple,
          as: "couple",
        },
      ],
    });
  }

  async update(id, data) {
    const memory = await Memory.findByPk(id);

    if (!memory) {
      return null;
    }

    return await memory.update(data);
  }

  async remove(id) {
    const memory = await Memory.findByPk(id);

    if (!memory) {
      return false;
    }

    await memory.destroy();

    return true;
  }

  async findAllByCouple(coupleId) {
    const { MemoryMedia } = require('../models');
    return await Memory.findAll({
      where: {
        couple_id: coupleId,
      },
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "first_name", "last_name", "profile_picture"],
        },
        {
          model: MemoryMedia,
          as: "media",
        },
      ],
      order: [["created_at", "DESC"]],
    });
  }

  async getTimelineFeed(coupleId, userId, limit = 10, offset = 0) {
    const { MemoryMedia, MemoryReaction, MemoryComment } = require('../models');
    const { fn, col, literal } = require('sequelize');

    const { count, rows } = await Memory.findAndCountAll({
      where: { couple_id: coupleId },
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'first_name', 'last_name', 'profile_picture'],
        },
        {
          model: MemoryMedia,
          as: 'media',
          attributes: ['id', 'media_type', 'file_url', 'thumbnail_url'],
          required: false,
        },
        {
          model: MemoryReaction,
          as: 'reactions',
          required: false,
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'first_name', 'last_name', 'profile_picture'],
            },
          ],
        },
        {
          model: MemoryComment,
          as: 'comments',
          required: false,
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'first_name', 'last_name', 'profile_picture'],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
      distinct: true,
    });

    return { rows, count };
  }
}

module.exports = new MemoryRepository();
