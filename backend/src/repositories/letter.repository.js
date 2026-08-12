const { Letter, User } = require('../models');

class LetterRepository {
  async create(data) {
    return Letter.create(data);
  }

  async findById(id) {
    return Letter.findByPk(id, {
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'first_name', 'last_name', 'profile_picture'],
        },
      ],
    });
  }

  async findAllByCouple(coupleId) {
    return Letter.findAll({
      where: { couple_id: coupleId },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'first_name', 'last_name', 'profile_picture'],
        },
      ],
      order: [['created_at', 'DESC']],
    });
  }

  async findAllByUser(userId) {
    return Letter.findAll({
      where: { sender_id: userId },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'first_name', 'last_name', 'profile_picture'],
        },
      ],
      order: [['created_at', 'DESC']],
    });
  }

  async findAllByCoupleOrUser(coupleId, userId) {
    const { Op } = require('sequelize');
    return Letter.findAll({
      where: {
        [Op.or]: [
          { couple_id: coupleId },
          { sender_id: userId },
        ],
      },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'first_name', 'last_name', 'profile_picture'],
        },
      ],
      order: [['created_at', 'DESC']],
    });
  }

  async update(id, data) {
    await Letter.update(data, { where: { id } });
    return this.findById(id);
  }

  async delete(id) {
    return Letter.destroy({ where: { id } });
  }
}

module.exports = new LetterRepository();
